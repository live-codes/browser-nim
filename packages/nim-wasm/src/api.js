// One implementation, two entry points: `index.js` for anywhere without a filesystem, and
// `index.node.js` for Node, which can also read the assets that ship in this package. The two things
// that differ between those environments — how the compiler is loaded, and where the JavaScript target's
// program runs — are handed in rather than guessed at.
import { resolveAssetSource } from './assets.js';
import { compileTranslationUnits, loadClangToolchain, runArtifact } from './clang.js';
import { compilerDiagnostics, stripAnsi } from './output.js';
import { DEFAULT_TARGET, resolveTarget, TARGETS } from './targets.js';

export function createApi({ packaged, acquireNimCompiler, executeJavaScript }) {
	/**
	 * Create a compiler. One instance serves both targets, because the Nim compiler is the same program
	 * either way and which output it produces is decided by the command it is given.
	 *
	 * A compiler holds a reference on the shared Clang runtime, for the `wasm` target, and on the shared
	 * Nim compiler, so a caller that has finished with one should `dispose()` it rather than leave it.
	 *
	 * @param {object} [options]
	 * @param {'wasm'|'js'} [options.target] - `wasm` (the default) compiles to C and then to WebAssembly
	 *   with `@live-codes/clang-wasm`'s toolchain; `js` emits one JavaScript file.
	 * @param {string} [options.baseUrl] - where the compiler's assets are served from. Required anywhere
	 *   without a filesystem; in Node it can be omitted to use the assets in this package.
	 * @param {string} [options.clangBaseUrl] - where the Clang toolchain's assets are, for the `wasm`
	 *   target. Passed to `@live-codes/clang-wasm`, whose rules apply: required in a browser, optional in
	 *   Node. The runtime is shared with any C/C++ compilers created against the same assets.
	 * @param {string[]} [options.compileArgs] - extra Nim flags, before the source path.
	 * @param {string[]} [options.args] - default program argv, for the `wasm` target.
	 * @param {(value: number) => void} [options.onProgress] - toolchain download progress, 0 to 1.
	 * @param {(text: string, stream: string) => void} [options.onLog] - the compilers' own output.
	 * @param {(text: string, stream: 'out'|'err') => void} [options.onOutput] - the program's output as it
	 *   is written, for a caller that wants to show a slow program while it runs. The result carries the
	 *   whole of it either way, and is what a caller should draw from when the run ends.
	 * @param {(text: string) => void} [options.onStatus] - what is happening, for a status line.
	 */
	async function createCompiler(options = {}) {
		const target = resolveTarget(options.target ?? DEFAULT_TARGET);
		const source = resolveAssetSource(options, packaged);
		const onLog = options.onLog ?? (() => {});
		const onStatus = options.onStatus ?? (() => {});

		const { compiler, release: releaseCompiler } = await acquireNimCompiler({ source, onStatus });

		// Both things this compiler uses are shared: the Clang runtime behind the toolchain, and the Nim
		// compiler. Releasing them is a reference going away rather than a teardown, so a caller that
		// disposes one compiler cannot break another that is still using the same assets.
		let disposed = false;

		// The compiler's output since the last compile, forwarded to the caller's log and turned into
		// diagnostics. Drained rather than pushed, because the loaded compiler is shared between compilers
		// made against the same assets.
		const takeOutput = () => {
			const raw = compiler.takeOutput();
			if (raw.trim()) onLog(raw, 'nim');
			return compilerDiagnostics(raw);
		};

		let toolchainPromise = null;
		const toolchain = () => {
			if (!toolchainPromise) {
				toolchainPromise = loadClangToolchain({
					baseUrl: options.clangBaseUrl,
					onProgress: options.onProgress
				});
			}
			return toolchainPromise;
		};

		let nimbasePromise = null;
		const nimbase = () => {
			if (!nimbasePromise) {
				nimbasePromise = source
					.readAsset('nimbase.h')
					.then((bytes) => new TextDecoder('utf-8', { fatal: true }).decode(bytes));
			}
			return nimbasePromise;
		};

		// A compile that produced nothing has no diagnostics of its own, so it needs a sentence of ours.
		const failure = (compileMs, errors, fallback = 'The Nim compiler produced no output.') => ({
			ok: false,
			stdout: '',
			stderr: '',
			output: '',
			errors: errors.length ? errors : [fallback],
			exitCode: null,
			compileMs,
			runMs: null
		});

		return {
			/** The resolved target, e.g. `wasm`. */
			target,

			/** Where the compiler's assets came from, for an error message a user can act on. */
			assetSource: source.description,

			/**
			 * Compile and run a program.
			 *
			 * @param {string} code - the program source.
			 * @param {string|Uint8Array} [input] - stdin, handed to the program once and then closed. The
			 *   `js` target does not read stdin.
			 * @param {object} [runOptions] - per-run overrides: `args`, `compileArgs`, and `execute`.
			 * @param {boolean} [runOptions.execute] - for the `js` target, compile without running and hand
			 *   the program back as `compiledCode`. This is for a caller that wants to place the program
			 *   itself — on a thread with a document, say — since otherwise it runs wherever this is called.
			 * @returns {Promise<{stdout: string, stderr: string, output: string, errors: string[],
			 *   exitCode: number|null, compileMs: number, runMs: number|null, compiledCode?: string}>}
			 *   `output` is stdout and stderr in the order the program wrote them. `errors` holds the
			 *   compilers' diagnostics and is empty when it compiled; `exitCode` is null when the program
			 *   never ran.
			 */
			async run(code, input = '', runOptions = {}) {
				if (disposed) throw new Error('This compiler has been disposed.');
				if (typeof code !== 'string') {
					throw new Error('run() needs the program source as its first argument.');
				}

				const compileStarted = performance.now();

				if (target === TARGETS.JS) {
					const compiled = compiler.compileToJs(code, options.compileArgs ?? []);
					const compileMs = Math.round(performance.now() - compileStarted);
					if (!compiled.ok) return failure(compileMs, takeOutput());

					const stdout = [];
					const stderr = [];
					const onOutput = runOptions.onOutput ?? options.onOutput ?? (() => {});
					const emit = (into, stream) => (text) => {
						into.push(text);
						onOutput(text, stream);
					};

					if (runOptions.execute === false) {
						return {
							ok: true,
							stdout: '',
							stderr: '',
							output: '',
							errors: [],
							exitCode: null,
							compileMs,
							runMs: null,
							compiledCode: compiled.js
						};
					}

					onStatus('running…');
					const runStarted = performance.now();
					const ran = await executeJavaScript(compiled.js, {
						onStdout: emit(stdout),
						onStderr: emit(stderr)
					});
					return {
						ok: !ran.failed,
						stdout: ran.stdout,
						stderr: ran.stderr,
						// What a terminal would have shown: both streams in the order they were written.
						output: ran.output,
						errors: [],
						exitCode: ran.failed ? 1 : 0,
						compileMs,
						runMs: Math.round(performance.now() - runStarted),
						compiledCode: compiled.js
					};
				}

				const compiled = compiler.compileToC(code, options.compileArgs ?? []);
				const compileMs = Math.round(performance.now() - compileStarted);
				if (!compiled.ok) return failure(compileMs, takeOutput());

				const translationUnits = compiled.files.map((file, index) => ({
					path: `nim/unit-${String(index).padStart(3, '0')}.c`,
					content: file.content
				}));

				const built = await toolchain();
				onStatus(`compiling ${translationUnits.length} translation units…`);
				const buildStarted = performance.now();
				let artifact;
				try {
					artifact = await compileTranslationUnits(built, {
						translationUnits,
						nimbase: await nimbase(),
						onCompilerOutput: (raw) => onLog(stripAnsi(raw), 'clang')
					});
				} catch (error) {
					return {
						ok: false,
						stdout: '',
						stderr: '',
						output: '',
						// The failure carries clang's or the linker's own words, already stripped of the
						// runtime's chatter.
						errors: [stripAnsi(error?.message ?? error)],
						exitCode: null,
						compileMs: Math.round(performance.now() - buildStarted),
						runMs: null
					};
				}
				const linkMs = Math.round(performance.now() - buildStarted);

				onStatus('running…');
				const stdout = [];
				const stderr = [];
				const order = [];
				const onOutput = runOptions.onOutput ?? options.onOutput ?? (() => {});
				const runStarted = performance.now();
				const ran = await runArtifact(built, artifact, {
					args: runOptions.args ?? options.args ?? [],
					stdin: input,
					onStdout: (chunk) => {
						stdout.push(chunk);
						order.push(chunk);
						onOutput(chunk, 'out');
					},
					onStderr: (chunk) => {
						stderr.push(chunk);
						order.push(chunk);
						onOutput(chunk, 'err');
					}
				});

				return {
					ok: ran.exitCode === 0,
					stdout: stdout.join(''),
					stderr: stderr.join(''),
					output: order.join(''),
					errors: [],
					exitCode: ran.exitCode,
					// `compileMs` is the whole build: Nim's codegen plus clang and the link, which is what a
					// caller waiting for a result is actually waiting for.
					compileMs: compileMs + linkMs,
					runMs: Math.round(performance.now() - runStarted)
				};
			},

			/**
			 * Release what this compiler holds: its reference on the shared Clang runtime, and the Nim
			 * compiler, which is dropped from the cache so that the next compiler loads a fresh one.
			 *
			 * Both are released rather than torn down, so anything else sharing them carries on — the
			 * runtime goes when its last holder lets go, and a run already in flight holds its own
			 * reference and finishes. Calling this twice is a no-op, and `run()` afterwards throws.
			 */
			async dispose() {
				if (disposed) return;
				disposed = true;
				releaseCompiler();
				// The toolchain may still be loading, which is why this is async. A load that failed has
				// nothing to release.
				if (toolchainPromise) {
					await toolchainPromise.then(
						(built) => built.dispose(),
						() => {}
					);
				}
			}
		};
	}

	return { createCompiler, TARGETS, targets: Object.values(TARGETS) };
}
