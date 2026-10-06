# Handoff: where this stands, and what the LiveCodes integration needs

Written at the end of a session that took the package to publishable and verified both backends. A new
session has no memory of any of it, so this file and the two documents it points at *are* the context.

## What this repository is

`@live-codes/nim-wasm` — Nim in the browser, no server, by either of Nim's backends — plus `browser-nim`,
the playground it came out of, which is how the package is exercised in a real browser.

- **`packages/nim-wasm`** — the package. `README.md` is its API; `docs/ASSETS.md` is where the compiler
  assets come from and how to move the pin; `THIRD-PARTY-NOTICES.md` and `LICENSE` are the legal side.
- **the root** — the playground: `index.html`, `src/`, `vendor/`, and `test/` which runs the page's samples
  through the package.

Two targets behind one option:

```js
const compiler = await createCompiler({ target: 'wasm', baseUrl, clangBaseUrl });
const { stdout, stderr, output, errors, exitCode, compiledCode } = await compiler.run(code, stdin, { args });
```

## State: finished, verified, committed

- `packages/nim-wasm`: **20/20**, `npm test`. Root: **8/8**, `npm test`.
- `target: 'wasm'` (default) — Nim's C backend, then Clang and lld through `@live-codes/clang-wasm@0.3.0`.
  Real streams: stdin (single and multi-line), stdout, stderr as separate channels, real exit codes, argv.
- `target: 'js'` — Nim's JS backend. Emits **one self-sufficient file** (no imports, no requires, no DOM
  unless the program asks), verified running in a bare `vm` context with only a `console`.
- **Page access works**: `--path:/lib/js` is applied for the `js` backend by default, so `import dom` and
  `import jsffi` resolve. Proven against a real browser DOM, not a stub — see the sample
  "Building a page with the dom module" in `src/samples.js`.
- `dispose()` — idempotent, `run()` afterwards throws, and releasing one compiler cannot break another.
- `createCompiler({ toolchain })` — compiles through a toolchain handed in by the caller, so LiveCodes can
  make C/C++ and Nim share one Clang runtime. `dispose()` never releases a caller's toolchain.
- Assets are pinned by SHA-256 and provenance in `packages/nim-wasm/src/asset-receipts.js`; every read is
  verified against the pin.
- Both committed bundles are current: `vendor/nim-worker.js` and `packages/nim-wasm/dist/nim-wasm.global.js`
  (347.6 KB). Rebuild with `npm run bundle` in the root and `npm run build:iife` in the package.

**Git policy, which matters when committing:** everything needed to run is tracked — assets, `vendor`,
built bundles — so the repository works without building first. Only `node_modules/` and `scratch/` are
ignored. Code style: tabs; comments explain *why*, not *what*.

## The integration: what to do

LiveCodes is at `D:\DevWork\live-codes\livecodes`. Read
`docs/docs/contribution/adding-languages.mdx` first; it is short and it is the checklist. The template to
follow is `src/livecodes/languages/clang-wasm/` — `lang-clang-wasm.ts` (the specs),
`lang-clang-wasm-script.ts` (the page-side runner), `index.ts` (re-export).

### Before writing any code

1. **Publish the package.** `npm publish --access public` for `@live-codes/nim-wasm@0.1.0`. Neither
   manifest has a `publishConfig` and a scoped package is private by default, so the flag is required.
   The package *contains* the assets, so nothing separate needs hosting — `getUrl` in `vendors.ts` is the
   whole CDN story.
2. **Decide where the toolchain comes from.** The worker must call `createCompiler({ target: 'wasm',
   baseUrl, toolchain })` with a toolchain from **the same clang-wasm instance LiveCodes uses**. Options:
   have the worker `importScripts` clang-wasm's own
   `dist/clang-wasm-toolchain.global.js` from `clangWasmBaseUrl` and call `createToolchain()` there, or
   hand the toolchain across from the app. Without this, `nim-wasm` loads a *second* ~29 MB Clang runtime
   next to the one C/C++ already holds — the pool lives inside a module instance, so the copy bundled
   inside this package's IIFE cannot be reached from outside it.

### The two languages, which are wired differently

- **`nim-wasm`** — the console language. Mirrors `lang-clang-wasm-script.ts`: a worker built from a string
  via `importScripts(<iife>)`, then `runCompiler(runner, ensureLoaded, code, stdin, setResult, settings)`
  from `languages/wasm-runtime.ts`, using `createWorkerRunner` from `languages/worker-runner.ts` and
  `createLoadingReporter` (both cleaner than the raw `parent.postMessage` clang-wasm uses). Extensions:
  `nimwasm`, `nim-wasm`, `wasm.nim`. stdin, stdout, stderr and exit codes all work.
- **`nim`** — the page language, and a different kind of thing. It compiles with `execute: false` and its
  output is run **in the result page**, which is where `import dom` gets a document. That is the
  TypeScript-shaped path: the compiler's `factory` returns the compiled JS, and `compiledCodeLanguage`
  says how to treat it. **This is the one convention not yet read** — read
  `src/livecodes/languages/typescript/lang-typescript.ts` (especially what its factory returns and how
  `compiledCodeLanguage` is consumed) before writing it. Extensions: `nim`, `nims`, `nimble`.

### Where things go

- `src/livecodes/vendors.ts` — `clangWasmBaseUrl` is line 65 and the file is alphabetical, so
  `nimWasmBaseUrl = getUrl('@live-codes/nim-wasm@0.1.0/')` goes just before `nunjucksBaseUrl` (line 384).
- `src/livecodes/languages/languages.ts` — imports are alphabetical (the clang-wasm import is line 13);
  the registration list is around lines 163–208.
- `src/sdk/models.ts` — **1938 lines and the one file not yet read closely.** `'c-wasm'` is at 174 and
  `'cpp-wasm'` at 205 in the `Language` union; the same names appear again around line 500 in a second
  union; the script types are a list containing `'text/objcpp-wasm'` (a unique anchor). So `'nim-wasm'`,
  `'nim'` and `'text/nim-wasm'` each need adding in three places. Read the regions around those lines
  before editing — a name added in only some of them is a typecheck failure.
- Then: a CodeMirror mode (Monaco is covered by `monaco-languages/src/nim.ts`, but
  `@live-codes/codemirror` has no Nim — add one or fall back to `clike`), Prism support (check whether
  `prism-nim` auto-loads), the docs page under `docs/docs/languages/`, `LanguageSliders.tsx`,
  `vendor-licenses.mdx`, and the language-count badge in `README.mdx`.

### Traps found, so they are not rediscovered

- **An empty stdin is a failure, not a no-op** on `nim-wasm`: `readLine()` raises `EOFError` and exits 1.
  A panel that always passes `''` turns "user left it blank" into a red error.
- **`nim` has no stdin, no program arguments, and no `stdout`/`stderr` identifiers.** `echo` reaches
  stdout through `console.log`, and `console.error` reaches stderr; `stdout.write` does not compile on that
  backend, with an import or without one. Turn those two panels off for `nim`.
- **`nim`'s output is a whole program** — a runtime prelude with top-level `var`s and a `main()` call at the
  end — so give each program its own scope instead of concatenating it with other scripts.
- **Diagnostics name `/tmp/user.nim`** (baked into the prebuilt's loader), so they need remapping before
  they become editor markers.
- **Single file only.** There is no multi-file `import` mounting yet.
- **The wasm tests need headroom.** `Fatal process out of memory` / `Cannot allocate Wasm memory` means the
  machine, not the code — but `os.freemem()` is not the meter; it is the *commit limit*, and Chrome's
  reservations count against it even when several GB of RAM are free. Close browsers before running them.
- **Windows shell notes:** PowerShell 5.1 has no heredocs (`<<'EOF'` is a parse error) and does not take
  `&&`; the shell rejects commands over ~8000 characters. In cmd, `cd` inside parentheses persists, so
  `(cd sub & npm test)` changes the directory for everything after it.
- **The file tools are scoped to this repository.** Reading `livecodes` needs the shell (that repo is
  outside the workspace).

## Suggested first prompt for a new session

> Read `HANDOFF.md` in `D:\DevWork\live-codes\browser-nim`, then implement the two LiveCodes language
> modules in `D:\DevWork\live-codes\livecodes` — but read `src/sdk/models.ts` around lines 170–210 and 490–510
> and the TypeScript compiler's factory before editing anything, since those are the two things the previous
> session did not read.
