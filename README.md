# browser-nim

Proof of concept: **compile and run Nim in the browser, with no server.** Two Nim targets, one
compiler, both entirely in the page:

- **`nim-wasm`** — the `c` backend, then the Clang 22 toolchain LiveCodes already ships turns that into
  WebAssembly. Real Nim semantics, and the only route to C interop.
- **`nim`** — the `js` backend, emitting one JavaScript file that runs in a sandboxed frame. Around
  five times faster to a result, a fraction of the payload, and the only one that can touch a document.

Nothing is sent anywhere, and there is no compilation backend.

```bash
npm install
npm run setup    # Nim compiler assets + the Clang toolchain + the page bundle
npm start        # http://localhost:4180
```

`npm start` is a plain static file server. It exists because the runtime fetches its assets over
HTTP and needs a real origin — it is not a compilation server, and nothing but static files is served.

<p align="center"><img src="docs/screenshot.png" alt="The playground after running the first sample" width="900"></p>

## How it works

Both targets start the same way: the Nim compiler, itself compiled to WebAssembly, runs in the page.
Which output it produces is decided by the command it is given.

```
nim-wasm
  your Nim code -> nim.wasm -> 8 x .c -> clang.wasm (one object per unit) -> lld.wasm
                -> one 129 KB .wasm -> WebAssembly.instantiate + a WASI shim -> output

nim
  your Nim code -> nim.wasm -> one 23 KB .js -> a sandboxed iframe -> output
```

The modules, by stage:

| File | Stage |
| --- | --- |
| `src/nim-compiler.js` | Loads the Nim compiler and drives it, for either backend |
| `src/clang-build.js` | C: compiles each translation unit and links them, then runs the module |
| `src/nim-js-runtime.js` | JavaScript: runs the emitted program in a sandboxed frame |
| `src/run-nim.js` | Wires the stages together behind `runner.run(source, { backend })` |
| `src/wasi-signal-header.js` | The `<signal.h>` the pruned WASI sysroot does not have |

### What the JavaScript backend changes

It removes the entire second half of the pipeline — no clang, no lld, no sysroot, no `crt1.o`, no WASI
shim — and with it every one of the C route's workarounds below: `-d:useMalloc`, the `<signal.h>` shim,
the three-argument `main` rewrite, mounting `nimbase.h`, and `-fgnuc-version`. Measured in Chromium,
warm:

| | `nim-wasm` | `nim` |
| --- | --- | --- |
| compile | 0.9 s, then 3.3 s of clang and linking | 0.4 – 0.8 s |
| artifact | 129 KB wasm, plus ~29 MB of Clang | 7 – 23 KB of JavaScript |
| total to output | 5.0 s | 0.5 – 1.0 s |

It also buys something the C route cannot: the program runs in a real document, so `importjs` and Nim's
`lib/js` modules can drive the DOM and `fetch` — see the "Calling into JavaScript" sample.

What it costs is fidelity, and the gap is wider than "a little slower":

- **`importc` and C interop do not exist.** That is the C route's unique capability.
- **64-bit integers are not exact.** They map to JavaScript numbers by default, so `int64`/`uint64`
  arithmetic silently loses precision; `--jsbigint64` is experimental.
- **`cast`, pointer arithmetic, manual memory, and anything depending on `sizeof` are unsupported.**
- **`os`, `osproc`, `net` and `threads` are unavailable**, so `commandLineParams()` does not work — the
  WebAssembly sample that uses it has no counterpart here. (The WASI sandbox has no filesystem either,
  so that part is a wash.)
- **`importjs` needs a `#` substitution pattern**, so an interop proc that takes no arguments is a
  compile error — every one has to take something, even a placeholder.
- **A runaway program hangs the tab.** The frame shares the page's event loop, so a loop that never ends
  cannot be timed out or killed without moving to a worker.

Neither target is a subset of the other, which is why both are offered rather than one replacing the
other.

### Reusing `@live-codes/clang-wasm` rather than shipping a second compiler

`src/clang-build.js` drives the Clang runtime directly instead of going through the package's
`createCompiler(...).run(code)`. The reason is one option:

```ts
// @wasm-idle/llvm-core, BrowserClangCompileRequest
/** Lowercase .c/.cc/.cpp/.cxx siblings are separate translation units outside trace mode. */
workspaceFiles?: BrowserClangWorkspaceFile[];
```

Nim's `c` backend emits **one `.c` per module** — `@msystem.nim.c`, `@muser.nim.c`, and so on — and
they cannot simply be concatenated, because each one declares the same types (`struct Exception`,
`NIM_BOOL`, …) and would collide in a single translation unit. They have to be compiled separately and
linked. The runtime supports exactly that through `workspaceFiles`; the package's `run()` does not
forward the option yet.

So the gap is small and worth closing — see [the change that removes this
workaround](#the-change-that-removes-this-workaround) below. Everything else is already shared: the
same `BrowserClangRuntime`, the same `vendor/clang` asset tree (**copied with the package's own
`clang-wasm-copy-assets` script**), and the same `executeBrowserClangArtifact`.

What the reuse buys, concretely: this adds **11 MB** (the Nim compiler) on top of a toolchain
LiveCodes already serves for C/C++ and Objective-C, rather than a second ~29 MB Clang.

## Findings

Six things had to be worked out. The first is a real bug in the toolchain that affects more than Nim.

### 1. `__GNUC__` is not defined, and it breaks nimbase.h

The runtime drives `clang -cc1` directly. `-cc1` does not define `__GNUC__`, because the version comes
from the *driver's* `-fgnuc-version` default:

```
$ probe.c:4: error: GNUC_NOT_defined
```

Nim's `nimbase.h` picks its `N_INLINE` macro with `#if defined(__GNUC__)`. Without it, it takes the
fallback `rettype __inline name`, which wasi-libc's `features.h` then rewrites to
`rettype inline name` — and since the parser is already past the `*` by then, that is a syntax error:

```
error: expected identifier or '('
    static N_INLINE(NIM_BOOL*, nimErrorFlag)(void);
    │      └─ expands to: static NIM_BOOL* inline nimErrorFlag(void);
```

The fix is one argument, restoring what a normal clang invocation does:

```js
export const GNUC_VERSION_ARG = '-fgnuc-version=4.2.1';
```

This is not Nim-specific. Any C that branches on `#if defined(__GNUC__)` silently gets the fallback
path through this runtime, so `@live-codes/clang-wasm` may want to pass it for C and C++ too.

### 2. Nim's three-argument `main` traps through the wrong entry point

Nim emits `int main(int argc, char** args, char** env)`. WASI's `crt1.o` reaches `main` through a
clang-generated wrapper — `__main_argc_argv` for a 2-argument `main`, and `__main_void` (which calls
`main()` with *no arguments*) for anything else. Through `__main_void`, Nim's runtime entry reads a
null `argv` and traps before printing:

```
RuntimeError: unreachable
    at main (unit-007.wasm)
    at __main_void (unit-007.wasm)
    at _start
```

Moving the third parameter out of the signature and setting it to null inside the body lands the
program on `__main_argc_argv` and gives it the real `argc`/`argv`.

### 3. The sysroot has no `<signal.h>`

The Clang runtime's sysroot is a pruned wasi-libc with the C++ headers restored on top. It has no
`signal.h` and no `setjmp.h`, but Nim's system module does `#include <signal.h>` and then calls
`signal()` and `raise()` while installing its `SIGSEGV`/`SIGABRT`/`SIGFPE` handlers.

`src/wasi-signal-header.js` supplies a minimal `<signal.h>` — the `SIG_*` values plus no-op `signal()`
and `raise()`. WASI has no signals, so nothing in it ever runs; a real trap aborts the instance
instead.

It is mounted at `include/wasm32-wasi/signal.h`, which is **already on the include path** the runtime
hands clang. That matters: between that and `nimbase.h` going at `include/nimbase.h`, the generated C
needs no rewriting at all. Its own `#include <signal.h>` and `#include "nimbase.h"` resolve as written.
(The `nimbase.h` the compiler does not ship is taken from `vendor/nim`, which is why `npm run setup`
fetches it.)

### 4. `-d:useMalloc` is mandatory, not a preference

The runtime's default link line is:

```
wasm-ld --export-dynamic -z stack-size=1048576 ... crt1.o <objects> -lc -lc++ -lc++abi -lm \
  -Llib/clang/22/lib/wasi -lclang_rt.builtins-wasm32 -o out.wasm
```

There is no `-lwasi-emulated-mman`, although the sysroot does ship `libwasi-emulated-mman.a` (the
Objective-C driver adds it explicitly). Nim's default allocator grows memory with `mmap`, so it fails
to link. `-d:useMalloc` routes allocation through wasi-libc's dlmalloc, which grows linear memory
directly.

### 5. `--compileOnly` turns a bogus failure into a clean exit

The `c` backend's last act is to shell out to gcc on the files it just generated. There is no gcc, so
every compile ends in `execution of an external program failed` and a non-zero exit — and on a machine
that *does* have a compiler on `PATH`, the call actually runs, reaching the real filesystem with paths
like `/home/web_user/.cache/nim/...`. Either way the exit code says nothing about whether code
generation succeeded.

`--compileOnly` stops before that step:

| | files | exit | time | invokes a host CC |
| --- | --- | --- | --- | --- |
| default | 5 | 1 | 1110 ms | yes |
| `--compileOnly` | 5 | **0** | **347 ms** | **no** |

Same generated C, three times quicker, and the exit code becomes a real success signal. The flags also
have to precede the source path — anything after it is taken as the program's arguments.

### 6. Two small ones that only show up outside a browser

- **`SharedArrayBuffer`.** The runtime's memory wrapper does `buf instanceof SharedArrayBuffer`
  unconditionally, which throws on a page that is not cross-origin isolated. A stub is enough, and it
  is what `@live-codes/clang-wasm` installs for the same reason.
- **`Module.quit`.** The Nim bundle's Node branch defaults `quit` to a function that sets
  `process.exitCode` before throwing, so a program that fails to compile sets the *host* process's exit
  status. Overriding it keeps the status with the caller.

Also worth noting for anyone copying the approach: the widely-linked reference demo captures the
compiler's output by overwriting `window.print`, but Emscripten binds its streams at load time from
`Module.print`/`Module.printErr` (`var out=Module["print"]||console.log.bind(console)`), so that
capture never sees anything. Setting a `Nim` module object before the script loads is what actually
works — and it is how Nim's errors and warnings reach the diagnostics panel here.

## Verification

```bash
npm test    # node --test test/*.test.mjs
```

- **`test/pipeline.test.mjs`** — the `nim-wasm` route end to end: Nim to C, the generated C to one wasm
  module and a run, plus a compile error that must stop before the C compiler. The Clang half is real:
  the same runtime, the same assets, over HTTP, exactly as the page loads them.
- **`test/samples.test.mjs`** — every sample of both targets, compiled and run. The `nim` samples are
  executed in a `vm` context with a console the test can read, which keeps the browser-only part (the
  frame, the messages) out of the test while still running the program the compiler actually emitted.
- **`test/nim-node-context.mjs`** — the Nim compiler driven from Node in a `vm` context, so both
  backends iterate in seconds instead of a browser round trip.

Both targets were also driven by hand in headless Chromium — every sample of each set, including the
error sample in each, and the `importjs` sample that reaches the frame's document. Warm timings are in
the comparison table above.

First load is ~11 MB of Nim assets plus ~29 MB of Clang assets. The clang runtime is cached per asset
URL, so it is paid once per page.

## What the two targets should be built on

Both should use `@live-codes/clang-wasm`'s **`createToolchain()`** entry, not its `createCompiler()`.
The package's own documentation describes it as the runtime with the policy taken out, "for a language
that is not C, C++ or Objective-C but still compiles *through* Clang — one whose frontend translates to
C", which is exactly this. It hands over the runtime, the runtime's lock, `addFile`,
`captureCompilerOutput`, `execute` and `runCommand`, and nothing else.

That matters for two reasons here:

- **`workspaceFiles` is on the runtime, not the four-language API.** Nim's `c` backend emits one `.c`
  per module and they cannot be concatenated — each declares the same types (`struct Exception`,
  `NIM_BOOL`, …) and they collide in one translation unit. The runtime compiles siblings as separate
  translation units through `workspaceFiles`; `createCompiler(...).run()` compiles exactly one source
  file and does not forward it.
- **One runtime, not two.** `createToolchain` acquires from the same pool `createCompiler` uses, keyed
  by asset source, so C/C++ and Nim share one asset load and one compiler process — and therefore one
  lock, so a Nim build and a C build queue instead of writing over each other's files.

So `src/clang-build.js` here is roughly what a driver looks like if you skip that and drive the runtime
directly. It works and is verified, but the package's entry is the better surface, and it also exports
`CLANG_DRIVER_DEFAULT_ARGS` for exactly the reason finding 1 describes — a driver that compiles C
itself has to pass those flags itself.

The `nim` target needs none of this: its whole pipeline is one compile and a sandboxed frame.

## Next steps

1. **Get both targets off the main thread.** For `nim-wasm` the runtime blocks whatever thread it runs
   on for several seconds; for `nim` the compile is on the main thread too, and a program that never
   ends hangs the tab with no way to time it out. A worker fixes both, and makes the runaway case
   killable. LiveCodes already runs its C/C++ compiler in a worker for the first reason, and the Nim
   bundle is a classic script, so the worker needs `importScripts` rather than the `<script>` tag
   `src/nim-compiler.js` uses today.
2. **Build and pin `nim.wasm` in-house.** `npm run assets:nim` fetches a third-party prebuilt bundle
   from someone's GitHub Pages. It works and is recorded in `asset-receipts.json`, but it should be
   built from the Nim sources and pinned the way the Clang assets are, ideally as a versioned
   `@live-codes` package. One compiler instance serves both targets, so that is one artifact to pin.
3. **Wire both into LiveCodes as separate language modules** — `nim` and `nim-wasm`, sharing one worker
   and one compiler instance, following the `lang-cpp-wasm-script.ts` shim. Not one language with a
   toggle: their sample sets, capabilities and error output differ, and a shared picker would have to
   misrepresent at least one of them.
4. **Trim the `nim-wasm` output.** `-d:release` with `--compileOnly` still emits ~130 KB of wasm for a
   hello world, where the JavaScript target emits 7 – 23 KB. Link with `--gc-sections` (the Objective-C
   driver already does) and consider `-d:danger` for a playground.

## Known limitations

**`nim-wasm`**

- **No threads.** `-d:useMalloc` plus a single-threaded WASI sysroot means `--threads:on` will not work.
- **No signals**, so Nim's segfault handler and Ctrl-C handling do not exist (see finding 3).
- **No real file I/O.** The program gets a WASI preview-1 environment with no preopened directories;
  reading or writing files will fail. stdin and argv are not wired up in the page yet, though
  `runner.run(source, { args, stdin })` accepts both.
- **`--exceptions:setjmp` will not build** — there is no `setjmp.h` in the sysroot, and no `jmp_buf`
  shim here. The default exceptions implementation works.

**`nim`**

- The fidelity gaps listed under "What the JavaScript backend changes": no C interop, inexact 64-bit
  integers, no `cast` or pointers, no `os`/`threads`, and `importjs` requiring a pattern. These are
  properties of the Nim JS target, not of this harness.
- **A runaway program cannot be interrupted**, because it shares the page's thread.

**Both**

- **First load is heavy** — ~11 MB of Nim assets, plus ~29 MB of Clang if the WebAssembly target is used
  at all — and there is no integrity checking on the Nim assets beyond the recorded receipt.

## Licensing and provenance

MIT for the code here, matching `@live-codes/clang-wasm` and the Nim standard library.

- `vendor/nim/nim.wasm`, `nim-bundle.js` — Nim 2.2.4 (MIT), built to wasm by the
  [Nim-WASM-Compiler](https://github.com/benagastov/Nim-WASM-Compiler) project, whose glue and patches
  are MIT. Its generated-C preparation is not used: the C is compiled as Nim emits it, apart from the
  entry point.
- `vendor/nim/nimbase.h` — Nim (MIT).
- `vendor/clang/` — Clang and LLD (Apache-2.0 with the LLVM exception), memfs, the sysroot, and the
  GNUstep libobjc2 runtime (MIT), copied from `@live-codes/clang-wasm`. See that package's
  `THIRD-PARTY-NOTICES.md`.

`vendor/` is committed here — about 41 MB of third-party binaries, so a clone runs with no setup step:
the Nim compiler assets, Clang, LLD, the WASI sysroot and the Objective-C runtime. `npm run setup`
regenerates it if it is ever removed. Note that `.gitignore` still lists `vendor/`, which has no effect
on files that are already tracked.
