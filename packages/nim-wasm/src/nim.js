// Loading the Nim compiler where there is a document or a worker global: the browser entry's half.
//
// The bundle is a classic Emscripten script, so it has to be evaluated in the global scope of whichever
// thread it runs on — top-level `var`/`function` declarations are what publish `FS` and `callMain`, and
// neither an ES module nor a wrapped function would do that. On a page that means a script tag; in a
// worker it means `importScripts`.
//
// `importScripts` is also the test for which one to use, rather than `document`. The Clang runtime
// installs a `document` stub on the global scope so its own code can run in a worker
// (`globalThis.document = { querySelectorAll }`), which leaves `typeof document` saying `object` there,
// with no `createElement` on it.
//
// That stub is why the worker has to be a classic worker: the bundle decides it is in a worker by looking
// for `importScripts`, which module workers do not have, and without it it initialises for no environment
// at all.
import { createCompilerCore } from './nim-compile.js';

const loadScript = (src) => {
	if (typeof importScripts === 'function') {
		try {
			importScripts(src);
			return Promise.resolve();
		} catch (error) {
			return Promise.reject(new Error(`Failed to load ${src}: ${error?.message ?? error}`));
		}
	}
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Failed to load ${src}`));
		document.head.appendChild(script);
	});
};

const compilers = new Map();

/**
 * Acquire the compiler for an asset source, loading it the first time and sharing it after that: it holds
 * the standard library in its memory filesystem, so a warm compiler is the difference between a compile
 * and a recompile.
 *
 * The count is what makes the sharing releasable. `release()` is the other half, and the last compiler to
 * be disposed drops the entry, so a thread that is finished with Nim gives the compiler's memory back
 * instead of holding it forever. A compiler object that is still held keeps working; what changes is that
 * the next one loads a fresh copy.
 *
 * @param {object} options
 * @param {object} options.source - from `resolveAssetSource`. The browser's is a hosted one.
 * @param {(text: string) => void} [options.onStatus]
 * @returns {Promise<{compiler: object, release: () => void}>}
 */
export async function acquireNimCompiler({ source, onStatus = () => {} }) {
	let entry = compilers.get(source.key);
	if (!entry) {
		entry = { references: 0, pending: null };
		entry.pending = loadInBrowser({ source, onStatus }).catch((error) => {
			// A failed load must not poison the cache, or a retry can never succeed.
			if (compilers.get(source.key) === entry) compilers.delete(source.key);
			throw error;
		});
		compilers.set(source.key, entry);
	}

	const compiler = await entry.pending;
	entry.references += 1;

	return {
		compiler,
		release() {
			entry.references -= 1;
			if (entry.references <= 0 && compilers.get(source.key) === entry) {
				compilers.delete(source.key);
			}
		}
	};
}

async function loadInBrowser({ source, onStatus }) {
	let settle;
	const ready = new Promise((resolve, reject) => {
		settle = { resolve, reject };
	});

	// The compiler reports on its own output as it runs, and whoever asked for this compile is the one who
	// wants it. A buffer rather than a callback, because the loaded compiler is cached per asset source and
	// shared: a callback baked in at load would belong to whoever asked first.
	const output = [];

	// Read by the bundle as its Emscripten Module. `noInitialRun` keeps it from running the compiler with
	// no arguments at load; `onRuntimeInitialized` is the only correct signal that `callMain` is usable,
	// since the wasm is still compiling when the script finishes evaluating.
	//
	// `quit` matters more than it looks: the bundle's Node branch defaults it to a function that sets
	// `process.exitCode` before throwing, so a program that fails to compile would set the host process's
	// exit status. Overriding it leaves the status with the caller, and `callMain` still gets it —
	// Emscripten's exception handling unwraps the thrown ExitStatus into a return value.
	globalThis.Nim = {
		locateFile: (file) => source.locateFile(file),
		noInitialRun: true,
		print: (text) => output.push(text),
		printErr: (text) => output.push(text),
		quit: (_status, toThrow) => {
			throw toThrow;
		},
		onRuntimeInitialized: () => settle.resolve(),
		onAbort: (what) => settle.reject(new Error(`Nim compiler aborted: ${what}`))
	};

	onStatus('loading the Nim compiler…');
	await loadScript(source.bundleUrl);
	await ready;

	const core = createCompilerCore({ FS: globalThis.FS, callMain: globalThis.callMain });

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
