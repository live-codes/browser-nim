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
| can | C interop, real 64-bit integers, `cast` and pointers | reach the document, `importjs` |

Neither is a subset of the other, which is why both exist rather than one replacing the other.

What `js` costs is fidelity, and the gap is wider than "slower": `importc` and C interop do not exist;
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
| `compiledCode` | The `js` target's program, as emitted. |

`runOptions` may override `args` and `onOutput`. One more, for `js`:

```js
const { compiledCode } = await compiler.run(code, '', { execute: false });
```

`execute: false` compiles without running and hands the program back, for a caller that wants to place it
itself — in its own sandbox, or on a thread with a document. `compiler.target` says which target a
compiler was created for, and `assetSource` says where its assets came from.

### `@live-codes/nim-wasm/frame`

The runner `run()` uses for the `js` target's program. A caller taking the program with `execute: false`
can use the same one rather than write its own:

```js
import { executeJavaScript } from '@live-codes/nim-wasm/frame';

const { stdout, failed } = await executeJavaScript(compiledCode, { onStdout, onStderr });
```

In a browser that is a sandboxed iframe, which is where the target's document comes from and what keeps
the program off the page; in Node it is a fresh `vm` context.

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
says what is whose.

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
- **The `js` target's program runs where you call it.** With a document that is an iframe; without one —
  a worker, or Node — it runs in the current scope, so it has no DOM. A program that needs one has to be
  run where there is one, which is what `execute: false` is for. A program that loops forever will hang
  whatever thread that is, and nothing here can stop it.
- **The `js` target's stdout is line-based.** The backend routes both `echo` and `stdout.write` through
  `console`, so a program that writes without a newline gains one.
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

What Node cannot test is the browser half of the `js` target — the frame, and the document a program can
reach through it — which is covered by `browser-nim`, the playground this package came out of, where both
targets are run in a browser.

## Licence

**MIT**, and nothing here is copyleft, so nothing constrains the programs you compile. The compiler in
`assets/nim/` is a third-party build under its own permissive licence; see
[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
