// The two pipelines behind one call: Nim source in, program output out.
//
//   `nim` — the JavaScript backend
//     Nim source -> nim.wasm -> one .js
//
//   `nim-wasm` — the C backend
//     Nim source -> nim.wasm -> N x .c -> clang -> N x .o -> lld -> one .wasm -> a WASI shim
//
// Neither is a subset of the other, which is why both are offered. The first is one compile and no
// toolchain at all, and it is the only one that can touch a DOM. The second is a real compiler, linker
// and runtime, so Nim's semantics hold — the JS backend maps Nim onto JavaScript, where 64-bit integers
// are not exact and C interop does not exist.
//
// This runs on the worker, so it stops short of anything that needs a document: the JavaScript target's
// program is compiled here and returned, and the page runs it. See `src/playground.js` for the other
// half, and note that everything here has to stay worker-safe — no `document`, no DOM APIs.
import { compileTranslationUnits, loadClangToolchain, runArtifact } from './clang-build.js';
import { loadNimCompiler } from './nim-compiler.js';

export const BACKENDS = Object.freeze({ JS: 'nim', WASM: 'nim-wasm' });

const ANSI = /\u001b\[[0-9;]*[A-Za-z]/g;
const stripAnsi = (text) => String(text ?? '').replace(ANSI, '');

// Nim's own filenames (`@m..@slib@ssystem.nim.c`) are mangled and carry `@` and `..`, which is not
// worth handing to a path normaliser. The names are only used to tell the translation units apart, so
// they are renamed to something plain. Nothing in the generated C refers to its own filename.
const unitPath = (index) => `nim/unit-${String(index).padStart(3, '0')}.c`;

export function createRunner({
	nimBaseUrl,
	clangBaseUrl,
	onStatus = () => {},
	onCompilerLog = () => {},
	onProgress = () => {},
	onOutput = () => {}
}) {
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
			const url = new URL('nimbase.h', new URL(nimBaseUrl, location.href));
			nimbasePromise = fetch(url).then((response) => {
				if (!response.ok) throw new Error(`Could not load nimbase.h: ${response.status}`);
				return response.text();
			});
		}
		return nimbasePromise;
	};

	const compiler = () => loadNimCompiler({ baseUrl: nimBaseUrl, onLog: nimLog, onStatus });

	const nimFailure = ({ backend, started, nimMs, cFiles = 0 }) => ({
		ok: false,
		phase: 'nim',
		backend,
		errors: diagnostics.length ? diagnostics : ['The Nim compiler produced no output.'],
		output: diagnostics.join('\n'),
		exitCode: null,
		cFiles,
		nimMs,
		totalMs: performance.now() - started
	});

	return {
		async run(source, { backend = BACKENDS.WASM, args = [], stdin = '' } = {}) {
			const started = performance.now();
			diagnostics = [];
			const useJs = backend === BACKENDS.JS;

			onStatus(`compiling Nim to ${useJs ? 'JavaScript' : 'C'}…`);
			const nim = await compiler();
			const nimStarted = performance.now();
			const generated = useJs ? nim.compileToJs(source) : nim.compileToC(source);
			const nimMs = performance.now() - nimStarted;

			if (!generated.ok) {
				return nimFailure({ backend, started, nimMs, cFiles: generated.files?.length ?? 0 });
			}

			if (useJs) {
				// Handed back rather than run here: running it needs a document, and this is the worker.
				// The page runs it — see `src/playground.js`.
				return {
					ok: true,
					phase: 'compiled',
					backend,
					// One readable file, worth showing. The C route's output is eight mangled translation
					// units, which is not.
					js: generated.js,
					compiledCode: generated.js,
					jsBytes: generated.js.length,
					nimMs,
					compileMs: 0,
					totalMs: performance.now() - started
				};
			}

			const translationUnits = generated.files.map((file, index) => ({
				path: unitPath(index),
				content: file.content
			}));

			onStatus('loading the Clang toolchain…');
			const toolchain = await loadClangToolchain({ baseUrl: clangBaseUrl, onProgress });

			onStatus(`compiling ${translationUnits.length} translation units…`);
			const compileStarted = performance.now();
			let artifact;
			try {
				artifact = await compileTranslationUnits(toolchain, {
					translationUnits,
					nimbase: await loadNimbase(),
					onCompilerOutput: (raw) => onCompilerLog(stripAnsi(raw))
				});
			} catch (error) {
				return {
					ok: false,
					phase: 'clang',
					backend,
					errors: [stripAnsi(error?.message ?? error)],
					output: '',
					exitCode: null,
					cFiles: translationUnits.length,
					nimMs,
					compileMs: performance.now() - compileStarted,
					totalMs: performance.now() - started
				};
			}
			const compileMs = performance.now() - compileStarted;

			onStatus('running…');
			const stdout = [];
			const stderr = [];
			const order = [];
			const runStarted = performance.now();
			const result = await runArtifact(toolchain, artifact, {
				args,
				stdin,
				onStdout: (chunk) => {
					stdout.push(chunk);
					order.push(chunk);
					// Passed on as it arrives, so a slow program can be watched while it runs. The whole
					// thing still comes back in the result, which is what a caller renders at the end.
					onOutput(chunk, 'out');
				},
				onStderr: (chunk) => {
					stderr.push(chunk);
					order.push(chunk);
					onOutput(chunk, 'err');
				}
			});
			const runMs = performance.now() - runStarted;

			return {
				ok: result.exitCode === 0,
				phase: 'run',
				backend,
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
