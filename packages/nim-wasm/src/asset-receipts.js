// What this package ships, pinned, and where it came from.
//
// These three files are the only artifact in the pipeline that is neither written here nor shipped by
// `@live-codes/clang-wasm`: Nim 2.2.4 compiled to WebAssembly by a third-party project, plus its patched
// Emscripten loader. They are pinned so that the dependency is at least immutable and traceable, and
// every read verifies against these numbers — see `assets.js`.
//
// Building them here would mean Emscripten, a Nim checkout, a two-stage wasm32 build of the compiler,
// and then that project's two patches: the standard library embedded in the loader as a base64 map,
// because the wasm compiler has no real filesystem to read `/lib` from, and the hook that writes
// submitted source into that in-memory filesystem. Neither is a flag.
export const ASSET_SOURCE = Object.freeze({
	kind: 'third-party prebuilt',
	project: 'Nim-WASM-Compiler',
	repository: 'https://github.com/benagastov/Nim-WASM-Compiler',
	commit: 'ca3471ae124b40b51268da6e202753dfa061731c',
	committedAt: '2026-06-15T05:32:08Z',
	url: 'https://benagastov.github.io/Nim-WASM-Compiler/static/nim/',
	license: "MIT, for that project's glue and patches; the compiler it contains is Nim 2.2.4, also MIT",
	compiler: {
		name: 'nim',
		version: '2.2.4',
		host: 'Emscripten, wasm32',
		buildCommand: 'nim c --cpu:wasm32 --os:any --define:danger --passC:"-s USE_ZLIB=1"'
	}
});

export const ASSET_RECEIPTS = Object.freeze({
	'nim-bundle.js': {
		bytes: 6566418,
		sha256: '170a78937e21ac0ec47e7d3f0eccefc261178f336ba92ab43acdb2f73ffd1301'
	},
	'nim.wasm': {
		bytes: 4812366,
		sha256: '40e8c62fb96ee786fcd91f0ee2306241adeaf38c148bc8ec9788e0cc5cb26567'
	},
	'nimbase.h': {
		bytes: 20734,
		sha256: '28491d05916eab446de054370808030b33b63fd5623dcd454212adec27ee934d'
	}
});
