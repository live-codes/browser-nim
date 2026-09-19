# Third-party notices

This package is MIT — see [LICENSE](./LICENSE). It ships one third-party build, and depends on another
package that ships more.

## `assets/nim/` — the Nim compiler, compiled to WebAssembly

| File | What it is | Licence |
| --- | --- | --- |
| `nim.wasm`, `nim-bundle.js` | Nim 2.2.4 compiled to wasm with Emscripten, plus the patched Emscripten loader that project publishes | MIT |
| `nimbase.h` | Nim's C header, as the compiler itself emits it | MIT |

- **Nim**, and its standard library, are MIT, copyright the Nim contributors.
  <https://github.com/nim-lang/nim>
- **The build is someone else's**, not this repository's: the artifacts come from the Nim-WASM-Compiler
  project, which is MIT. <https://github.com/benagastov/Nim-WASM-Compiler>

Where exactly these bytes came from — the upstream repository, the commit, and the SHA-256 of each file
— is recorded in [`src/asset-receipts.js`](./src/asset-receipts.js), and every read of them is checked
against it. They are pinned so that the dependency is at least immutable and traceable.

They are also *not built here*, and building them would mean Emscripten, a Nim checkout, a two-stage
wasm32 build of the compiler, and then that project's two patches: the standard library embedded in the
loader as a base64 map, because the wasm compiler has no real filesystem to read `/lib` from, and the
hook that writes submitted source into that in-memory filesystem. Neither is a flag.

## The Clang toolchain — a dependency, not shipped here

The `wasm` target compiles its C with [`@live-codes/clang-wasm`](https://www.npmjs.com/package/@live-codes/clang-wasm).
That package's assets — Clang, LLD, memfs, the WASI sysroot and the GNUstep libobjc2 runtime — keep
their own permissive licences: **Apache-2.0 with the LLVM exception** for Clang, LLD, memfs and the
sysroot, and **MIT** for libobjc2. Its own `THIRD-PARTY-NOTICES.md` lists them one by one.

None of it is copyleft, and none of it constrains the programs you compile.
