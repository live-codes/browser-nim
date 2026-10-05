# @live-codes/nim-wasm

Run **Nim** in the browser, by either of its backends, on the Nim compiler compiled to WebAssembly. No
server, no native toolchain: the compiler runs in the page, and the `wasm` target's C is compiled by the
same Clang 22 toolchain [`@live-codes/clang-wasm`](https://www.npmjs.com/package/@live-codes/clang-wasm)
uses for C, C++ and Objective-C.

```js
import { createCompiler } from '@live-codes/nim-wasm';

const compiler = await createCompiler({ target: 'wasm' });

const { stdout, errors, exitCode } = await compiler.run(`
  echo "hello from Nim"
`);
```

In a browser there is no filesystem, so a page has to be given a URL for the compiler's assets:

```bash
npx @live-codes/nim-wasm-copy-assets public/nim
```

```js
const compiler = await createCompiler({
  target: 'wasm',
  baseUrl: new URL('/nim/', location.href),
  clangBaseUrl: new URL('/clang/', location.href)
});
```

Either way the package is bundled like any other npm package, because it imports `@live-codes/clang-wasm`
by name.

## The two targets

| | `wasm` (default) | `js` |
| --- | --- | --- |
| how | Nim's `c` backend, then clang and lld | Nim's `js` backend |
| artifact | 8 `.c` files, then ~129 KB of wasm | 23 KB of JavaScript |
| compile | ~0.9 s of Nim, then ~3.3 s of clang and linking | ~0.4 – 0.9 s |
| can | C interop, real 64-bit integers, `cast` and pointers | drive the page it runs in, through `dom` and `jsffi` |

Neither is a subset of the other, which is why both exist rather than one replacing the other.

A `js` program can drive the page it runs in. The browser modules that ship with the compiler — `dom`,
`jsffi`, `jsconsole`, `jscore`, `jsre` and `asyncjs` — are on its search path, so `import dom` and
`document.title = "…"` work as written, and anything else on the page is reachable through `jsffi`. None of
it is needed to *run* a program: one that imports none of them is a single file needing a `console` and
nothing else, which is what makes it safe to hand to a page and run there.

What `js` costs is fidelity, and the gap is wider than "slower": there is no C to interoperate with, since
`importc` binds JavaScript there and not C;
64-bit integers map to JavaScript numbers and are not exact (`--jsbigint64` is experimental); `cast`,
pointer arithmetic and anything depending on `sizeof` are unsupported; `os`, `osproc`, `net` and
`threads` are unavailable, so `commandLineParams()` does not work; and `importjs` requires a `#`
substitution pattern, so an interop proc that takes no arguments will not compile.

What `wasm` costs is the toolchain: the Clang assets are ~29 MB, fetched the first time they are needed
rather than on load.

## API

### `createCompiler(options)`

Returns a promise for a compiler. The compiler's assets are fetched here, so a bad `baseUrl` fails at
this point rather than at the first `run`.

| Option | Meaning |
| --- | --- |
| `target` | `'wasm'` (default) or `'js'`. Aliases: `c`, `nim-wasm`, `javascript`. |
| `baseUrl` | Where this package's assets are served from. **Optional in Node**, where the assets that ship in the package are read off disk; required anywhere else. |
| `clangBaseUrl` | Where the Clang toolchain's assets are, for `wasm`. Passed to `@live-codes/clang-wasm`, whose rules apply — required in a browser, optional in Node — and whose runtime is *shared* with any C/C++ compilers created against the same assets, so a page running both pays for the toolchain once or not at all. |
| `compileArgs` | Extra Nim flags, e.g. `['--define:release2']`. |
| `args` | Default program argv, for `wasm`. |
| `onProgress` | `(value) => {}`, 0 to 1, while the toolchain downloads. |
| `onLog` | `(text, stream) => {}` — the compilers' own output, which is where diagnostics arrive. |
| `onOutput` | `(text, stream) => {}` — the program's output as it is written. See Notes. |
| `onStatus` | `(text) => {}`, for a status line. |

### `compiler.run(code, input?, runOptions?)`

| Field | Meaning |
| --- | --- |
| `stdout` / `stderr` | Everything the program wrote to each stream. |
| `output` | Both, in the order the program wrote them — what a terminal would have shown. |
| `errors` | The Nim compiler's, clang's and the linker's diagnostics, one string per line, colour removed. **Empty when it built**, so `errors.length` is a reliable failure test. |
| `exitCode` | The program's status, or `null` if it never ran because the compile failed. |
| `compileMs` | Wall clock for the compile — for `wasm`, Nim's codegen plus clang and the link, which is what a caller is actually waiting for. |
| `runMs` | Wall clock for the run, or `null` if it did not run. |
| `compiledCode` | The `js` target's program, as emitted: one self-sufficient file, which a caller can run itself. |

`runOptions` may override `args` and `onOutput`. One more, for `js`:

```js
const { compiledCode } = await compiler.run(code, '', { execute: false });
```

`execute: false` compiles without running and hands the program back, for a caller that has somewhere of
its own to run it — its own sandbox, or the page it is already on. The program is one file with nothing
left to resolve: it imports nothing, requires nothing, and reaches for no DOM of its own accord, so a
`console` beside it is the whole of what it needs. That is what makes the `js` target usable the way a
compiler that *emits* a program is used — compile in a worker, hand the output to the page, run it there.
`compiler.target` says which target a compiler was created for, and `assetSource` says where its assets
came from.

### `compiler.dispose()`

Release what the compiler holds: its reference on the shared Clang runtime, for the `wasm` target, and the
Nim compiler. Both are shared, so this drops a reference rather than tearing anything down — the runtime
goes when its last holder lets go, and another compiler on the same assets carries on untouched. Calling
it twice is a no-op, and `run()` afterwards throws.

A caller that creates compilers as a user moves between languages should dispose them; a page that creates
one and keeps it has nothing to do.

### `@live-codes/nim-wasm/frame`

The runner `run()` uses for the `js` target's program. A caller taking the program with `execute: false`
can use the same one rather than write its own:

```js
import { executeJavaScript } from '@live-codes/nim-wasm/frame';

const { stdout, failed } = await executeJavaScript(compiledCode, { onStdout, onStderr });
```

In a browser that is a sandboxed iframe, which is where the target's document comes from and what keeps
the program off the page; in Node it is a fresh `vm` context. A caller that already has a sandbox of its
own — a page, or a playground — should run the program in that instead, and take it with `execute: false`.

### `@live-codes/nim-wasm/iife`

`dist/nim-wasm.global.js` is a minified IIFE for anywhere an ES module cannot go — a classic worker, a
plain `<script>`, a CDN URL handed to `importScripts()`. It sets `self.nimWasm` to `createCompiler`,
`TARGETS` and `targets`, and bundles the Clang toolchain with it, so it is a large single file. It is
built from `src/index.js` and carries none of the Node-only code.

## Where the assets come from

The compiler ships inside the package: about 11 MB of `nim.wasm`, its loader and `nimbase.h`. They are a
**third-party prebuilt** — Nim 2.2.4 compiled to wasm by another project — so they are pinned by
SHA-256 and provenance in [`src/asset-receipts.js`](./src/asset-receipts.js), and every read is checked
against that pin, which names the expected and actual digests when it fails. `THIRD-PARTY-NOTICES.md`
says what is whose, and [`docs/ASSETS.md`](./docs/ASSETS.md) records where the bytes came from, how they
were built, and how to replace or re-pin them.

In a browser those files have to be served, and `nim-wasm-copy-assets` copies them — with a receipt file
for its own bytes — into a directory you already serve.

The other toolchain is not shipped here at all. The `wasm` target reaches it through
`@live-codes/clang-wasm`, which is where its assets and their receipts live.

## Notes

- **The compilers block the thread they run on.** Nim's compiler and the whole Clang toolchain are
  synchronous, so a build takes the calling thread for its duration — seconds. Run the package in a
  worker, as `browser-nim` does, and the page stays responsive.
- **Compiles do not interleave.** Everything between clearing the compiler's cache and reading its
  output is synchronous, so two `run()` calls on the same compiler queue behind each other rather than
  writing over one another. The Clang toolchain serialises itself for the same reason.
- **`onOutput` is a stream, and the result is the truth.** The program's output arrives chunk by chunk
  while it runs, and in full in the result when it finishes; draw the first and trust the second.
- **The `js` target's program needs a console, not a document.** Its output is one file with nothing to
  resolve — imported Nim modules are inlined into it — so `execute: false` and an `eval` in a context with
  a `console` is enough to run it. A program that itself uses `dom` or `jsffi` is the exception, and has to
  be run where there is a document. Without `execute: false`, `run()` uses a frame when there is one and
  the caller's own scope when there is not. A program that loops forever will hang whatever thread that
  is, and nothing here can stop it.
- **The `js` target has no `stdin`, `stdout` or `stderr`.** `echo` goes to `console.log`, which arrives as
  `stdout`, and `console.error` — reached with `jsffi` or `importjs` — arrives as `stderr`, so the two
  streams exist but the names do not: `stdout.write` will not compile on this backend, with an import or
  without one. Output is line-based either way, because it goes through `console`.
- **Memory.** Budget for the Nim compiler's own footprint, plus the Clang runtime's few hundred MB if the
  `wasm` target is used at all.

## Verification

```bash
npm test    # node --test test/*.test.mjs
```

Real compiles and real runs, in Node, off the assets that ship in this package: both targets end to end,
the result shape, diagnostics for a program that does not compile, `compileArgs`, program argv, streaming
output, `execute: false`, one compiler across repeated runs, two targets side by side, and the error a
browser gets when `baseUrl` is missing.

The lifecycle is covered too: `dispose()`, the error `run()` throws after it, one compiler being disposed
while another on the same runtime keeps working, and the `js` program's self-sufficiency — the emitted file
run in a bare context with a `console` and nothing else.

What Node cannot test is the browser half of the `js` target — the frame, and the document a program can
reach through it — which is covered by `browser-nim`, the playground this package came out of, where both
targets are run in a browser.

## Licence

**MIT**, and nothing here is copyleft, so nothing constrains the programs you compile. The compiler in
`assets/nim/` is a third-party build under its own permissive licence; see
[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
