// The whole pipeline behind one call: Nim source in, program output out.
//
//   Nim source
//     -> nim.wasm        (the Nim 2.2.4 compiler, in the browser)      -> N x .c
//     -> clang.wasm      (@live-codes/clang-wasm's toolchain, via the runtime) -> N x .o
//     -> lld.wasm        (same toolchain)                              -> one .wasm
//     -> WebAssembly.instantiate                                        -> output
//
// Nothing here needs a server, and nothing is sent anywhere.
import { loadNimCompiler } from './nim-to-c.js';
import { compileTranslationUnits, loadClangRuntime, runArtifact } from './clang-build.js';

const ANSI = /\u001b\[[0-9;]*[A-Za-z]/g;
const stripAnsi = (text) => String(text ?? '').replace(ANSI, '');

// Nim's own filenames (`@m..@slib@ssystem.nim.c`) are mangled and carry `@` and `..`, which is not
// worth handing to a path normaliser. The names are only used to tell the translation units apart, so
// they are renamed to something plain. Nothing in the generated C refers to its own filename.
const unitPath = (index) => `nim/unit-${String(index).padStart(3, '0')}.c`;

export function createRunner({ nimBaseUrl, clangBaseUrl, onStatus = () => {}, onCompilerLog = () => {}, onProgress = () => {} }) {
	let nimbasePromise = null;

	// The compiler's diagnostics and its progress chatter both come out of the bundle's `printErr`, so
	// they are collected here for the caller to report as build output.
	let diagnostics = [];
	const nimLog = (text) => {
		const clean = stripAnsi(text);
		if (clean.trim()) diagnostics.push(clean);
		onCompilerLog(clean);
	};

	const loadNimbase = () => {
		if (!nimbasePromise) {
			const url = new URL('nimbase.h', new URL(nimBaseUrl, document.baseURI));
			nimbasePromise = fetch(url).then((response) => {
				if (!response.ok) throw new Error(`Could not load nimbase.h: ${response.status}`);
				return response.text();
			});
		}
		return nimbasePromise;
	};

	const compiler = () => loadNimCompiler({ baseUrl: nimBaseUrl, onLog: nimLog, onStatus });

	return {
		/** Load both toolchains. Optional: `run` does it on first use. */
		async warmup() {
			await Promise.all([compiler(), loadClangRuntime({ baseUrl: clangBaseUrl, onProgress, onLog: onCompilerLog })]);
		},

		async run(source, { args = [], stdin = '' } = {}) {
			const started = performance.now();
			diagnostics = [];

			onStatus('compiling Nim to C…');
			const nim = await compiler();
			const nimStarted = performance.now();
			const generated = nim.compile(source);
			const nimMs = performance.now() - nimStarted;

			if (!generated.ok) {
				return {
					ok: false,
					phase: 'nim',
					errors: diagnostics.length ? diagnostics : ['The Nim compiler produced no C output.'],
					output: diagnostics.join('\n'),
					exitCode: null,
					cFiles: 0,
					nimMs
				};
			}

			const translationUnits = generated.files.map((file, index) => ({
				path: unitPath(index),
				content: file.content
			}));

			onStatus('loading the Clang toolchain…');
			const runtime = await loadClangRuntime({
				baseUrl: clangBaseUrl,
				onProgress,
				onLog: (text) => onCompilerLog(stripAnsi(text))
			});

			onStatus(`compiling ${translationUnits.length} translation units…`);
			const compileStarted = performance.now();
			let artifact;
			try {
				artifact = await compileTranslationUnits(runtime, {
					translationUnits,
					nimbase: await loadNimbase()
				});
			} catch (error) {
				return {
					ok: false,
					phase: 'clang',
					errors: [stripAnsi(error?.message ?? error)],
					output: '',
					exitCode: null,
					cFiles: translationUnits.length,
					nimMs,
					compileMs: performance.now() - compileStarted
				};
			}
			const compileMs = performance.now() - compileStarted;

			onStatus('running…');
			const stdout = [];
			const stderr = [];
			const order = [];
			const runStarted = performance.now();
			const result = await runArtifact(artifact, {
				args,
				stdin,
				onStdout: (chunk) => {
					stdout.push(chunk);
					order.push(chunk);
				},
				onStderr: (chunk) => {
					stderr.push(chunk);
					order.push(chunk);
				}
			});
			const runMs = performance.now() - runStarted;

			return {
				ok: result.exitCode === 0,
				phase: 'run',
				stdout: stdout.join(''),
				stderr: stderr.join(''),
				// What a terminal would have shown: both streams in the order the program wrote them.
				output: order.join(''),
				exitCode: result.exitCode,
				errors: [],
				cFiles: translationUnits.length,
				artifactBytes: artifact.bytes?.byteLength ?? artifact.bytes?.length ?? 0,
				nimMs,
				compileMs,
				runMs,
				totalMs: performance.now() - started
			};
		}
	};
}
