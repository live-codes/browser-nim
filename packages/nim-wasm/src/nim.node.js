// Loading the Nim compiler in Node, where there is no global scope to publish `FS` and `callMain` into
// and no reason to reach for a file.
//
// The bundle is a classic Emscripten script with Node support compiled in, so it is evaluated in a vm
// context: top-level `var` declarations become properties of that context, which is where the compiler's
// entry points can be picked up. And because the package reads the assets itself, `nim.wasm` is handed
// over as bytes through `Module.wasmBinary` — the bundle then never fetches anything, which is also what
// lets every asset be checked against its pinned receipt before it is used.
//
// Only reachable through the `node` condition in package.json, so a browser bundle never includes it.
import { createRequire } from 'node:module';
import vm from 'node:vm';

import { createCompilerCore } from './nim-compile.js';

const compilers = new Map();

export function loadNimCompiler({ source, compileArgs = [], onLog = () => {}, onStatus = () => {} }) {
	if (!compilers.has(source.key)) {
		const pending = loadInNode({ source, compileArgs, onLog, onStatus }).catch((error) => {
			compilers.delete(source.key);
			throw error;
		});
		compilers.set(source.key, pending);
	}
	return compilers.get(source.key);
}

async function loadInNode({ source, compileArgs, onLog, onStatus }) {
	const [bundleBytes, wasmBytes] = await Promise.all([
		source.readAsset('nim-bundle.js'),
		source.readAsset('nim.wasm')
	]);
	const bundleText = new TextDecoder('utf-8', { fatal: true }).decode(bundleBytes);

	let settle;
	const ready = new Promise((resolve, reject) => {
		settle = { resolve, reject };
	});

	// The compiler reports on its own output as it runs, and whoever asked for this compile is the one who
	// wants it. A buffer rather than a callback, because the loaded compiler is cached per asset source and
	// shared: a callback baked in at load would belong to whoever asked first.
	const output = [];

	// Everything the bundle reaches for that a Node global does not already provide. `atob` is the
	// interesting one: it unpacks its embedded standard library through it, so without it the compiler
	// fails the moment it starts.
	const context = vm.createContext(
		Object.assign(Object.create(null), {
			require: createRequire(import.meta.url),
			// Only used by the bundle to build a script path, which nothing fetches here.
			__dirname: process.cwd(),
			console,
			process,
			Buffer,
			URL,
			TextEncoder,
			TextDecoder,
			WebAssembly,
			performance,
			setTimeout,
			clearTimeout,
			setInterval,
			clearInterval,
			queueMicrotask,
			crypto: globalThis.crypto,
			atob: globalThis.atob,
			btoa: globalThis.btoa,
			fetch: globalThis.fetch,
			structuredClone: globalThis.structuredClone,
			AbortController: globalThis.AbortController,
			Nim: {
				wasmBinary: wasmBytes,
				noInitialRun: true,
				print: (text) => output.push(text),
				printErr: (text) => output.push(text),
				// Without this the bundle sets `process.exitCode` on the host before throwing, so a
				// program that fails to compile would set this process's exit status.
				quit: (_status, toThrow) => {
					throw toThrow;
				},
				onRuntimeInitialized: () => settle.resolve(),
				onAbort: (what) => settle.reject(new Error(`Nim compiler aborted: ${what}`))
			}
		})
	);

	onStatus('loading the Nim compiler…');
	vm.runInContext(bundleText, context, { filename: 'nim-bundle.js' });
	await ready;

	const core = createCompilerCore({
		FS: context.FS,
		callMain: context.callMain,
		global: context
	});

	return {
		...core,
		/** The compiler's output since the last call, which is where its diagnostics are. */
		takeOutput() {
			const text = output.join('');
			output.length = 0;
			return text;
		}
	};
}
