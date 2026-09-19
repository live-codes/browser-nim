// Steps 2-4 of the C pipeline: Nim's generated C -> objects -> one wasm module -> a run.
//
// This goes through `@live-codes/clang-wasm`'s low-level entry rather than the Clang runtime directly.
// `createToolchain` is that runtime with the four-language policy taken out, which is exactly what a
// driver for a language that merely *compiles through* Clang needs: the runtime, its lock, `addFile`,
// `captureCompilerOutput` and `execute`, and nothing else.
//
// Going through the package buys two things beyond not depending on someone else's internals:
//
//  - **One runtime, shared.** The toolchain is acquired from the same pool `createCompiler` uses, keyed
//    by asset source, so a page running C/C++ alongside Nim pays for one runtime and one asset load -
//    and shares its lock, so the two cannot write over each other's files or redirect each other's
//    output.
//  - **One place that knows the flags.** `CLANG_DRIVER_DEFAULT_ARGS` is the package's own list of what a
//    driver's clang invocation needs, and why. `-fgnuc-version` is in it because clang's `-cc1` does not
//    define `__GNUC__` on its own, which is what makes Nim's nimbase.h pick an `N_INLINE` that does not
//    compile. Copying that list here would be a copy that drifts.
import {
	CLANG_DRIVER_DEFAULT_ARGS,
	compilerDiagnostics,
	createToolchain
} from '@live-codes/clang-wasm/toolchain';

import { WASI_SIGNAL_HEADER, WASI_SIGNAL_HEADER_PATH } from './wasi-signal-header.js';

const NIMBASE_PATH = 'include/nimbase.h';

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

const toolchains = new Map();

/**
 * Acquire the shared Clang toolchain, once per asset URL.
 *
 * The toolchain holds a reference on the shared runtime and is kept for the life of the thread: the
 * runtime costs ~29 MB of assets and ~84 MB resident, and keeping it is what makes a warm compile
 * ~100 ms instead of ~3 s. Nothing disposes it, because the only thing that ends it here is the worker
 * being terminated, which takes the whole runtime with it.
 */
export function loadClangToolchain({ baseUrl, onProgress }) {
	const key = String(baseUrl);
	if (!toolchains.has(key)) {
		const pending = createToolchain({ baseUrl, onProgress }).catch((error) => {
			// A failed load must not poison the cache, or a retry can never succeed.
			toolchains.delete(key);
			throw error;
		});
		toolchains.set(key, pending);
	}
	return toolchains.get(key);
}

const mounted = new WeakSet();

/**
 * Put the headers Nim's generated C needs where clang will find them.
 *
 * `include/` and `include/wasm32-wasi/` come from the sysroot and are already on the include path, so
 * dropping the files in there means the generated C needs no rewriting — its own `#include
 * "nimbase.h"` and `#include <signal.h>` resolve as written.
 */
const mountHeaders = (toolchain, nimbase) => {
	if (mounted.has(toolchain)) return;
	toolchain.addFile(WASI_SIGNAL_HEADER_PATH, WASI_SIGNAL_HEADER);
	toolchain.addFile(NIMBASE_PATH, nimbase);
	mounted.add(toolchain);
};

/**
 * Compile every translation unit and link them into one wasm module.
 *
 * `workspaceFiles` is what makes each sibling its own object file rather than something textually
 * included into one unit — Nim emits a file per module and they declare the same types, so they cannot
 * be concatenated.
 *
 * @param {object} options
 * @param {Array<{path: string, content: string}>} options.translationUnits
 * @param {string} options.nimbase - the `nimbase.h` the compiler itself does not ship.
 * @param {(raw: string) => void} [options.onCompilerOutput] - clang's and wasm-ld's output as it
 *   arrived, for a build log. It is the same stream `compilerDiagnostics` filters.
 * @throws if clang or the linker failed, carrying their diagnostics as the message.
 */
export async function compileTranslationUnits(
	toolchain,
	{ translationUnits, nimbase, onCompilerOutput = () => {} }
) {
	mountHeaders(toolchain, nimbase);
	if (!translationUnits.length) throw new Error('Nothing to compile: Nim produced no C files.');

	const activeIndex = Math.max(
		0,
		translationUnits.findIndex((unit) => DEFINES_MAIN.test(unit.content))
	);
	const active = translationUnits[activeIndex];
	const siblings = translationUnits.filter((_, index) => index !== activeIndex);

	// The lock is held for the whole build. The runtime owns one compiler process and one filesystem, so
	// a second build starting now would write over this one's files.
	const { result, raw, error } = await toolchain.lock(() =>
		toolchain.captureCompilerOutput(() =>
			toolchain.runtime.compileArtifact(adaptMainSignature(active.content), {
				language: 'C',
				fileName: active.path,
				workspaceFiles: siblings.map(({ path, content }) => ({ path, content })),
				compileArgs: [...CLANG_DRIVER_DEFAULT_ARGS]
			})
		)
	);

	onCompilerOutput(raw);

	if (error) {
		// What clang or the linker said is the only useful part of a failure — a bare "process exited with
		// code 1" tells a reader nothing. `compilerDiagnostics` drops the runtime's own chatter first, so
		// the message is the compiler's words and nothing else.
		const diagnostics = compilerDiagnostics(raw);
		throw new Error(diagnostics.length ? diagnostics.join('\n') : String(error?.message ?? error));
	}
	return result;
}

export const runArtifact = (toolchain, artifact, { args = [], stdin, onStdout = () => {}, onStderr = () => {} }) =>
	toolchain.execute(artifact, {
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
