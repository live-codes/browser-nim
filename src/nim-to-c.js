// Step 1 of the pipeline: Nim source -> C translation units, using the Nim compiler compiled to wasm.
//
// `nim-bundle.js` is a classic Emscripten build, so it is loaded as a script rather than imported and
// it publishes `FS` and `callMain` as globals. It also reads a global `Nim` object as its Emscripten
// `Module`, which is how the output streams and the load hook get wired up — that has to happen
// before the script is added, because `Module` is captured at evaluation time.
//
// `compile()` returns the generated C; compiling it is the next step's job.

const NIM_CACHE_DIR = '/tmp/nimcache';
const NIM_USER_FILE = '/tmp/user.nim';

// An explicit cache directory rather than Nim's default under `$HOME`, so the path the generated C is
// read back from does not depend on how the compiler was told to set up its home directory.
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
// Order matters: anything after the source path is taken as the program's arguments, so every flag
// has to come before it.
export const NIM_COMPILE_ARGS = Object.freeze([
	'c',
	'--hints:off',
	'-d:release',
	'-d:useMalloc',
	'--compileOnly',
	`--nimcache:${NIM_CACHE_DIR}`,
	'--path:/lib/pure',
	'--path:/lib/pure/collections',
	'--path:/lib/core',
	'-o:/tmp/user',
	'/tmp/user.nim'
]);

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

/** Drop the previous program's generated C and source, so a build never links a stale unit. */
export const clearNimCache = (FS, cacheDir = NIM_CACHE_DIR) => {
	for (const name of listCache(FS, cacheDir)) {
		try {
			FS.unlink(`${cacheDir}/${name}`);
		} catch {
			// A cache entry we cannot remove is not worth failing the compile over.
		}
	}
	try {
		FS.unlink(NIM_USER_FILE);
	} catch {
		// Not written yet on a first run.
	}
};

const injectScript = (src) =>
	new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Failed to load ${src}`));
		document.head.appendChild(script);
	});

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
	const base = new URL(baseUrl, document.baseURI);

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
	await injectScript(new URL('nim-bundle.js', base).href);
	await ready;

	const FS = globalThis.FS;
	const { callMain } = globalThis;

	return {
		FS,

		/** Compile Nim source to the C files the `c` backend emitted. */
		compile(source) {
			clearNimCache(FS);

			// The bundle writes whichever of these is pending to /tmp/user.nim the first time the
			// compiler touches that path. `__NIM_USER_CODE__` also decides whether it auto-runs.
			globalThis.__NIM_USER_CODE__ = source;
			globalThis.__NIM_USER_CODE_PENDING__ = source;

			let exitCode;
			try {
				exitCode = callMain([...NIM_COMPILE_ARGS]);
			} catch (error) {
				exitCode = `threw: ${error?.message ?? error}`;
			}

			const files = collectGeneratedCFiles(FS);
			return {
				files,
				exitCode,
				// Both, because a successful compile that emitted nothing would still be a failure here.
				ok: exitCode === 0 && files.length > 0
			};
		}
	};
}
