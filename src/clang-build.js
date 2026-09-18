// Steps 2-4 of the pipeline: Nim's generated C -> objects -> one wasm module -> a run.
//
// This drives the Clang 22 runtime directly rather than the `@live-codes/clang-wasm` package API. The
// package is what LiveCodes uses for C/C++ and Objective-C; its `run(code)` compiles exactly one
// source file, and the runtime underneath it only compiles siblings as separate translation units
// when they are handed over as `workspaceFiles`. The package does not forward that option yet, so
// this module does — which is the whole reason Nim can be built on the same toolchain instead of
// shipping a second C compiler.
//
// Everything else is the same: the same `BrowserClangRuntime`, the same asset tree, the same
// `executeBrowserClangArtifact` to run the result.
import {
	BrowserClangRuntime,
	executeBrowserClangArtifact,
	loadRuntimeManifest,
	resolveRuntimeManifestUrl
} from '@wasm-idle/llvm-core/clang';

import { WASI_SIGNAL_HEADER, WASI_SIGNAL_HEADER_PATH } from './wasi-signal-header.js';

const NIMBASE_PATH = 'include/nimbase.h';

/**
 * clang's `-cc1` frontend does not define `__GNUC__` on its own: the version comes from the driver's
 * `-fgnuc-version` default, and the runtime drives `-cc1` directly. So anything that decides features
 * with `#if defined(__GNUC__)` silently takes the fallback branch.
 *
 * Nim's nimbase.h is exactly that case, and it matters: the `else` branch defines
 * `N_INLINE(rettype, name)` as `rettype __inline name`, which the wasi-libc `features.h` reached by
 * `<string.h>` then rewrites to `rettype inline name` — invalid C, because by then the parser is
 * already inside the declarator. The `__GNUC__` branch produces `inline rettype name`, which is fine.
 *
 * 4.2.1 is the value clang's driver passes by default, so this restores the behaviour a normal clang
 * invocation would have had.
 */
const GNUC_VERSION_ARG = '-fgnuc-version=4.2.1';

/** The unit that defines `main` is handed over as the active source; the rest are siblings. */
const DEFINES_MAIN = /\bint\s+main\s*\(/;

/**
 * WASI's `crt1.o` does not call `main` directly. Clang emits a wrapper for it: `__main_argc_argv` when
 * `main` takes `(argc, argv)`, and `__main_void` — which calls `main()` with no arguments at all — for
 * every other signature, including Nim's three-argument form. Called with nothing, Nim's runtime entry
 * reads a null `argv` and traps before printing anything.
 *
 * Moving the third parameter out of the signature and setting it to null inside the body puts the
 * program on `__main_argc_argv`, so it gets the real argc/argv. A browser has no process environment,
 * so a null `env` is the honest value.
 */
const NIM_THREE_ARG_MAIN = /int\s+main\s*\(\s*int\s+(\w+)\s*,\s*char\s*\*\*\s*(\w+)\s*,\s*char\s*\*\*\s*(\w+)\s*\)\s*\{/;

const adaptMainSignature = (content) =>
	content.replace(NIM_THREE_ARG_MAIN, 'int main(int $1, char** $2) {\n\tchar** $3 = (char**)0;');

const runtimes = new Map();

export function loadClangRuntime({ baseUrl, onProgress, onLog }) {
	const key = String(baseUrl);
	if (!runtimes.has(key)) {
		const pending = createRuntime({ baseUrl, onProgress, onLog }).catch((error) => {
			// A failed load must not poison the cache, or a retry can never succeed.
			runtimes.delete(key);
			throw error;
		});
		runtimes.set(key, pending);
	}
	return runtimes.get(key);
}

/**
 * The runtime's memory wrapper does `buf instanceof SharedArrayBuffer` unconditionally, which throws
 * "SharedArrayBuffer is not defined" on a page that is not cross-origin isolated. Nothing on this path
 * allocates a real one — only the LLDB debug runtime would, and this does not use it — so a stub is
 * enough, and it is what `@live-codes/clang-wasm` installs for the same reason. Without it every run
 * fails at the first compile.
 */
const ensureSharedArrayBufferStub = () => {
	if (typeof globalThis.SharedArrayBuffer === 'undefined') {
		globalThis.SharedArrayBuffer = class SharedArrayBuffer {};
	}
};

async function createRuntime({ baseUrl, onProgress, onLog }) {
	ensureSharedArrayBufferStub();
	const manifest = await loadRuntimeManifest(resolveRuntimeManifestUrl(baseUrl));
	const runtime = new BrowserClangRuntime({
		runtimeBaseUrl: baseUrl,
		manifest,
		// The compiler's own stdin is never read; the program gets its input at execution time.
		stdin: () => '',
		stdout: (chunk) => onLog(chunk),
		// The linker's errors are only forwarded when logging is on, and without them a failed link is
		// an unexplained "exited with code 1".
		log: true,
		progress: onProgress
	});
	await runtime.ready;
	return runtime;
}

const mounted = new WeakSet();

/**
 * Put the headers Nim's generated C needs where clang will find them.
 *
 * `include/` and `include/wasm32-wasi/` come from the sysroot and are already on the include path, so
 * dropping the files in there means the generated C needs no rewriting — its own `#include
 * "nimbase.h"` and `#include <signal.h>` resolve as written.
 */
const mountHeaders = (runtime, { nimbase }) => {
	if (mounted.has(runtime)) return;
	const files = [
		[WASI_SIGNAL_HEADER_PATH, WASI_SIGNAL_HEADER],
		[NIMBASE_PATH, nimbase]
	];
	for (const [path, content] of files) {
		const parts = path.split('/').slice(0, -1);
		let directory = '';
		for (const part of parts) {
			directory = directory ? `${directory}/${part}` : part;
			try {
				runtime.memfs.addDirectory(directory);
			} catch {
				// Already there from the sysroot; memfs asserts on a duplicate node.
			}
		}
		runtime.memfs.addFile(path, content);
	}
	mounted.add(runtime);
};

/**
 * Compile every translation unit and link them into one wasm module.
 *
 * `workspaceFiles` is what makes each sibling its own object file rather than something textually
 * included into one unit — Nim emits a file per module and they declare the same types, so they
 * cannot be concatenated.
 */
export async function compileTranslationUnits(runtime, { translationUnits, nimbase, compileArgs = [] }) {
	mountHeaders(runtime, { nimbase });
	if (!translationUnits.length) throw new Error('Nothing to compile: Nim produced no C files.');

	const activeIndex = Math.max(
		0,
		translationUnits.findIndex((unit) => DEFINES_MAIN.test(unit.content))
	);
	const active = translationUnits[activeIndex];
	const siblings = translationUnits.filter((_, index) => index !== activeIndex);

	return runtime.compileArtifact(adaptMainSignature(active.content), {
		language: 'C',
		fileName: active.path,
		workspaceFiles: siblings.map(({ path, content }) => ({ path, content })),
		compileArgs: [GNUC_VERSION_ARG, ...compileArgs]
	});
}

export const runArtifact = (artifact, { args = [], stdin, onStdout = () => {}, onStderr = () => {} }) =>
	executeBrowserClangArtifact(artifact, {
		args,
		stdin: makeStdin(stdin),
		stdout: onStdout,
		stderr: onStderr
	});

// stdin is read in chunks: hand the whole buffer over once, then signal EOF with null.
const makeStdin = (input) => {
	if (input == null || input.length === 0) return () => null;
	let sent = false;
	return () => {
		if (sent) return null;
		sent = true;
		return input;
	};
};
