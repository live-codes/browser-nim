// Step 1 of both pipelines: load the Nim compiler, and drive it.
//
// `nim-bundle.js` is a classic Emscripten build, so it is loaded as a script rather than imported and
// it publishes `FS` and `callMain` as globals. It also reads a global `Nim` object as its Emscripten
// `Module`, which is how the output streams and the load hook get wired up — that has to happen
// before the script is added, because `Module` is captured at evaluation time.
//
// One instance serves both backends: the compiler is the same program, and which output it produces is
// decided by the command it is given. They are not interchangeable, though — see `src/samples.js` for
// what each can run.

const NIM_CACHE_DIR = '/tmp/nimcache';
const NIM_USER_FILE = '/tmp/user.nim';

// Every path the compiler is told to write, so a failed compile can never be mistaken for the
// previous successful one. `-o` is where the program goes; the cache is the C backend's per-module
// output and the compiler's own build record.
const NIM_OUTPUT_FILES = [NIM_USER_FILE, '/tmp/user', '/tmp/user.js'];

// Shared by both backends. Order matters: anything after the source path is taken as the program's
// arguments, so every flag has to come before it.
const COMMON_ARGS = Object.freeze([
	'--hints:off',
	'-d:release',
	`--nimcache:${NIM_CACHE_DIR}`,
	'--path:/lib/pure',
	'--path:/lib/pure/collections',
	'--path:/lib/core'
]);

// The `c` backend, for the WebAssembly route.
//
// `-d:useMalloc` is not optional. Nim's default allocator grows memory with mmap, and the Clang
// runtime's link line does not pull in wasi's mmap emulation, so the default allocator fails to link.
// This routes allocation through wasi-libc's dlmalloc instead, which grows wasm memory directly.
//
// `--compileOnly` stops the compiler before it shells out to a C compiler. The `c` backend's last step
// is to invoke gcc on the files it just generated, and there is no gcc: without this the compile
// always ends in a reported failure, the exit code is meaningless, and on a host that does have a
// compiler the call actually runs — reaching the real filesystem with paths like
// `/home/web_user/.cache/nim/...` and failing there instead. With it the step is a clean exit 0, and
// it is roughly three times quicker.
//
// What it emits is one `.c` per Nim module, which is the next step's input.
export const NIM_C_COMPILE_ARGS = Object.freeze([
	'c',
	...COMMON_ARGS,
	'-d:useMalloc',
	'--compileOnly',
	'-o:/tmp/user',
	NIM_USER_FILE
]);

// The `js` backend, for the JavaScript route.
//
// None of the C route's accommodations apply: there is no allocator to choose, no C compiler to stop
// before, and no link step. What it emits is one self-contained `.js` file, which the page can run as
// it stands.
export const NIM_JS_COMPILE_ARGS = Object.freeze(['js', ...COMMON_ARGS, '-o:/tmp/user.js', NIM_USER_FILE]);

const C_FILE = /\.(?:c|cpp)$/;

const listCache = (FS, cacheDir) => {
	try {
		return FS.readdir(cacheDir).filter((name) => name !== '.' && name !== '..');
	} catch {
		return [];
	}
};

/**
 * The generated C files, newest compile only.
 *
 * A previous, larger program can leave `.c` files behind in the cache, and every translation unit in
 * there would be linked into the next build, so this must be called on a cleared cache to mean
 * anything.
 */
export const collectGeneratedCFiles = (FS, cacheDir = NIM_CACHE_DIR) =>
	listCache(FS, cacheDir)
		.filter((name) => C_FILE.test(name))
		.sort()
		.map((name) => ({ name, content: FS.readFile(`${cacheDir}/${name}`, { encoding: 'utf8' }) }));

/** Drop the previous program's output and cache, so a build never links or runs a stale artifact. */
export const clearNimCache = (FS, cacheDir = NIM_CACHE_DIR) => {
	for (const name of listCache(FS, cacheDir)) {
		try {
			FS.unlink(`${cacheDir}/${name}`);
		} catch {
			// A cache entry we cannot remove is not worth failing the compile over.
		}
	}
	for (const path of NIM_OUTPUT_FILES) {
		try {
			FS.unlink(path);
		} catch {
			// Nothing there from a previous run.
		}
	}
};

// The bundle is a classic Emscripten script, so it has to be evaluated in the global scope of whichever
// thread it runs on: top-level `var`/`function` declarations are what publish `FS` and `callMain`, and
// neither an ES module nor a wrapped function would do that. On the page that means a script tag; in
// the worker it means `importScripts`.
//
// `importScripts` is also the test for which one to use, rather than `document`. The Clang runtime
// installs a `document` stub on the global scope so its own code can run in a worker
// (`globalThis.document = { querySelectorAll }`), which leaves `typeof document` saying `object` there —
// with no `createElement` on it.
//
// That stub is also why the worker cannot be a module worker: the bundle decides it is in a worker by
// looking for `importScripts`, which module workers do not have, and without it it initialises for no
// environment at all.
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

let compilerPromise = null;

/**
 * Load the Nim compiler once and keep it: it holds the stdlib in its memory filesystem, so a warm
 * compiler is the difference between a compile and a recompile.
 */
export function loadNimCompiler(options) {
	if (!compilerPromise) {
		compilerPromise = createNimCompiler(options).catch((error) => {
			compilerPromise = null;
			throw error;
		});
	}
	return compilerPromise;
}

async function createNimCompiler({ baseUrl, onLog = () => {}, onStatus = () => {} }) {
	// `location` exists on both threads, unlike `document`, so this module can be loaded either way. The
	// page resolves its asset URLs absolutely before they reach the worker regardless.
	const base = new URL(baseUrl, location.href);

	let settle;
	const ready = new Promise((resolve, reject) => {
		settle = { resolve, reject };
	});

	// Read by the bundle as its Emscripten Module. `noInitialRun` keeps it from running the compiler
	// with no arguments at load; `onRuntimeInitialized` is the only correct signal that `callMain` is
	// usable, since the wasm is still compiling when the script finishes evaluating.
	//
	// `quit` matters more than it looks: the bundle's Node branch defaults it to a function that sets
	// `process.exitCode` before throwing, so a program that fails to compile would set the *host*
	// process's exit status. Overriding it leaves the status to the caller, and `callMain` still gets
	// it — Emscripten's exception handling unwraps the thrown ExitStatus into a return value.
	globalThis.Nim = {
		locateFile: (file) => new URL(file, base).href,
		noInitialRun: true,
		print: (text) => onLog(text, 'stdout'),
		printErr: (text) => onLog(text, 'stderr'),
		quit: (_status, toThrow) => {
			throw toThrow;
		},
		onRuntimeInitialized: () => settle.resolve(),
		onAbort: (what) => settle.reject(new Error(`Nim compiler aborted: ${what}`))
	};

	onStatus('loading the Nim compiler…');
	await loadScript(new URL('nim-bundle.js', base).href);
	await ready;

	const FS = globalThis.FS;
	const { callMain } = globalThis;

	// The bundle writes whichever of these is pending to /tmp/user.nim the first time the compiler
	// touches that path. `__NIM_USER_CODE__` also decides whether it auto-runs.
	const compile = (nimSource, args) => {
		clearNimCache(FS);
		globalThis.__NIM_USER_CODE__ = nimSource;
		globalThis.__NIM_USER_CODE_PENDING__ = nimSource;

		try {
			return callMain([...args]);
		} catch (error) {
			return `threw: ${error?.message ?? error}`;
		}
	};

	return {
		FS,

		/** Compile Nim source to the C files the `c` backend emitted, one per module. */
		compileToC(nimSource) {
			const exitCode = compile(nimSource, NIM_C_COMPILE_ARGS);
			const files = collectGeneratedCFiles(FS);
			// Both, because a successful compile that emitted nothing would still be a failure here.
			return { files, exitCode, ok: exitCode === 0 && files.length > 0 };
		},

		/** Compile Nim source to the single JavaScript file the `js` backend emitted. */
		compileToJs(nimSource) {
			const exitCode = compile(nimSource, NIM_JS_COMPILE_ARGS);

			let js = '';
			try {
				js = FS.readFile('/tmp/user.js', { encoding: 'utf8' });
			} catch {
				// Left empty; `ok` is false and the caller reports the diagnostics.
			}
			return { js, exitCode, ok: exitCode === 0 && js.length > 0 };
		}
	};
}
