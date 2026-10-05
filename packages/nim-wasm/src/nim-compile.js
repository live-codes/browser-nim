// Driving the Nim compiler, once it has been loaded.
//
// Split from the loading because the two environments load it differently — a script tag or
// `importScripts` in a browser, a vm context in Node — and everything below is the same either way.

const NIM_CACHE_DIR = '/tmp/nimcache';
const NIM_USER_FILE = '/tmp/user.nim';

// Every path the compiler is told to write, so a failed compile cannot be mistaken for the previous
// successful one.
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

// The `c` backend, for the WebAssembly target.
//
// `-d:useMalloc` is not optional. Nim's default allocator grows memory with mmap, and the Clang
// runtime's link line does not pull in wasi's mmap emulation, so the default allocator fails to link.
// This routes allocation through wasi-libc's dlmalloc instead.
//
// `--compileOnly` stops the compiler before it shells out to a C compiler. The `c` backend's last step
// is to invoke gcc on the files it just generated, and there is none: without this every compile ends in
// a reported failure, the exit code says nothing about whether code generation worked, and on a machine
// that does have a compiler on PATH the call actually runs against paths that do not exist there.
export const NIM_C_COMPILE_ARGS = Object.freeze([
	'c',
	...COMMON_ARGS,
	'-d:useMalloc',
	'--compileOnly',
	'-o:/tmp/user',
	NIM_USER_FILE
]);

// The `js` backend. None of the above applies: there is no allocator to choose, no C compiler to stop
// before, and no link step. What comes out is one self-contained file.
//
// `lib/js` is on the search path because the browser modules live there and the compiler does not look
// there on its own. `dom`, `jsffi`, `jsconsole`, `jscore`, `jsre` and `asyncjs` are all in the standard
// library the bundle carries — `import dom` fails with "cannot open file: dom" without this, which reads
// as the module being missing when it is only unreachable. They are what lets a program drive the page it
// runs in, which is the whole reason to use this backend over the WebAssembly one.
export const NIM_JS_COMPILE_ARGS = Object.freeze([
	'js',
	...COMMON_ARGS,
	'--path:/lib/js',
	'-o:/tmp/user.js',
	NIM_USER_FILE
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
 * A previous, larger program can leave `.c` files behind, and every one of them would be linked into the
 * next build, so this only means anything on a cache that was cleared first.
 */
export const collectGeneratedCFiles = (FS, cacheDir = NIM_CACHE_DIR) =>
	listCache(FS, cacheDir)
		.filter((name) => C_FILE.test(name))
		.sort()
		.map((name) => ({ name, content: FS.readFile(`${cacheDir}/${name}`, { encoding: 'utf8' }) }));

/** Drop the previous program's output and cache, so nothing stale is linked or run. */
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

// Extra flags have to land before the source path, since Nim treats everything after it as the program's
// own arguments.
const withFlags = (args, extra) => {
	if (!extra.length) return args;
	const at = args.indexOf(NIM_USER_FILE);
	return [...args.slice(0, at), ...extra, ...args.slice(at)];
};

/**
 * The compiler's two entry points, over a loaded runtime.
 *
 * Extra flags are per call rather than per compiler, because the loaded compiler is cached per asset
 * source and shared: anything baked in here would belong to whoever asked first.
 *
 * @param {object} runtime - from the evaluated Emscripten bundle.
 * @param {object} runtime.FS
 * @param {Function} runtime.callMain
 * @param {object} [runtime.global] - the realm the bundle was evaluated in, which is where the globals
 *   below have to be set. In a browser that is `globalThis`; under Node the bundle lives in a vm context,
 *   and setting these on the host's global would leave the compiler looking for a source file that was
 *   never written.
 */
export function createCompilerCore({ FS, callMain, global = globalThis }) {
	// The bundle writes whichever of these is pending to /tmp/user.nim the first time the compiler
	// touches that path. `__NIM_USER_CODE__` also decides whether it auto-runs.
	const compile = (source, args) => {
		clearNimCache(FS);
		global.__NIM_USER_CODE__ = source;
		global.__NIM_USER_CODE_PENDING__ = source;

		try {
			return callMain([...args]);
		} catch (error) {
			return `threw: ${error?.message ?? error}`;
		}
	};

	return {
		/** Compile to the C files the `c` backend emitted, one per module. */
		compileToC(source, compileArgs = []) {
			const exitCode = compile(source, withFlags(NIM_C_COMPILE_ARGS, compileArgs));
			const files = collectGeneratedCFiles(FS);
			// Both, because a successful compile that emitted nothing is still a failure here.
			return { files, exitCode, ok: exitCode === 0 && files.length > 0 };
		},

		/** Compile to the single JavaScript file the `js` backend emitted. */
		compileToJs(source, compileArgs = []) {
			const exitCode = compile(source, withFlags(NIM_JS_COMPILE_ARGS, compileArgs));

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
