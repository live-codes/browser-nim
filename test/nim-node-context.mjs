// The Nim compiler, driven from Node instead of a browser.
//
// `nim-bundle.js` is a classic Emscripten script with Node support compiled in, so it can be
// evaluated in a vm context. That makes both backends iterable in seconds rather than a browser round
// trip, and it exercises exactly the same bundle, globals and compile arguments the page uses — only
// the container differs.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import vm from 'node:vm';

import {
	clearNimCache,
	collectGeneratedCFiles,
	NIM_C_COMPILE_ARGS,
	NIM_JS_COMPILE_ARGS
} from '../src/nim-compiler.js';

const ANSI = /\u001b\[[0-9;]*[A-Za-z]/g;

export const NIM_ASSET_DIR = resolve(import.meta.dirname, '..', 'vendor', 'nim');

export async function createNodeNimCompiler({ assetDir = NIM_ASSET_DIR } = {}) {
	const bundlePath = join(assetDir, 'nim-bundle.js');
	const require = createRequire(import.meta.url);

	let diagnostics = [];
	let settle;
	const ready = new Promise((resolveReady, rejectReady) => {
		settle = { resolve: resolveReady, reject: rejectReady };
	});

	// Everything the bundle reaches for that a Node global does not already provide. `atob` is the
	// interesting one: the bundle unpacks its embedded stdlib through it, so without it the compiler
	// fails with "atob is not defined" the moment it starts.
	const context = vm.createContext(
		Object.assign(Object.create(null), {
			require,
			__dirname: assetDir,
			__filename: bundlePath,
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
				locateFile: (file) => join(assetDir, file).replace(/\\/g, '/'),
				noInitialRun: true,
				print: (text) => diagnostics.push(text),
				printErr: (text) => diagnostics.push(text),
				// Without this the bundle sets `process.exitCode` on the host before throwing, so a
				// program that fails to compile would make the whole test process exit non-zero.
				quit: (_status, toThrow) => {
					throw toThrow;
				},
				onRuntimeInitialized: () => settle.resolve(),
				onAbort: (what) => settle.reject(new Error(`Nim compiler aborted: ${what}`))
			}
		})
	);

	vm.runInContext(readFileSync(bundlePath, 'utf8'), context, { filename: bundlePath });
	await ready;

	// The bundle writes whichever of these is pending to /tmp/user.nim the first time the compiler
	// touches that path.
	const compile = (source, args) => {
		diagnostics = [];
		clearNimCache(context.FS);
		context.__NIM_USER_CODE__ = source;
		context.__NIM_USER_CODE_PENDING__ = source;

		try {
			return context.callMain([...args]);
		} catch (error) {
			return `threw: ${error?.message ?? error}`;
		}
	};

	// Nim reports errors on the compiler's stderr; `-fcolor-diagnostics`-style SGR escapes come along
	// for the ride.
	const reportedDiagnostics = () =>
		diagnostics.map((line) => String(line).replace(ANSI, '')).filter((line) => line.trim());

	const readFile = (path) => {
		try {
			return context.FS.readFile(path, { encoding: 'utf8' });
		} catch {
			return '';
		}
	};

	return {
		/** Compile to the C files the `c` backend emits, one per module. */
		compileToC(source, { args = NIM_C_COMPILE_ARGS } = {}) {
			const exitCode = compile(source, args);
			const files = collectGeneratedCFiles(context.FS);
			return {
				files,
				exitCode,
				ok: exitCode === 0 && files.length > 0,
				diagnostics: reportedDiagnostics()
			};
		},

		/** Compile to the single JavaScript file the `js` backend emits. */
		compileToJs(source) {
			const exitCode = compile(source, NIM_JS_COMPILE_ARGS);
			const js = readFile('/tmp/user.js');
			return { js, exitCode, ok: exitCode === 0 && js.length > 0, diagnostics: reportedDiagnostics() };
		}
	};
}
