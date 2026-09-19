// The page side: owns the worker that compiles, and the frame that runs what it compiles.
//
// Program output is delivered twice over: `onOutput` reports each chunk as the program is written, and
// the final result carries the whole thing. A caller draws the first and trusts the second, since the
// stream is what makes a slow program watchable and the result is what makes the pane correct.
//
// The split is forced by one thing — the JavaScript target's program needs a document, and a worker has
// none — and it pays for itself twice over. Compiling leaves the page's thread, so neither the Nim
// compiler nor the Clang runtime can freeze it; and a build that runs away can be killed, because
// discarding a worker is a real way to stop it.
//
// The JavaScript target's *program* is the exception: it runs in a frame on this thread, because the DOM
// is the reason to use that target at all. That also means a program of its own that loops forever still
// hangs the page, and no stop button can reach it. Running it somewhere killable would mean running it
// without a document.
// The runner from `/frame` rather than the package's main entry, which would bring the compiler and the
// Clang toolchain into this bundle — the page has no use for either, and the worker loads them itself.
import { executeJavaScript } from '@live-codes/nim-wasm/frame';

export function createPlayground({
	// Where `npm run bundle` writes the worker. Only the bundling convention is assumed; pass a URL to
	// host it somewhere else.
	workerUrl = './vendor/nim-worker.js',
	nimBaseUrl,
	clangBaseUrl,
	onStatus = () => {},
	onCompilerLog = () => {},
	onProgress = () => {},
	onOutput = () => {}
}) {
	// Resolved here because a worker resolves relative URLs against its own script, not the page.
	const assets = {
		nimBaseUrl: new URL(nimBaseUrl, document.baseURI).href,
		clangBaseUrl: new URL(clangBaseUrl, document.baseURI).href
	};

	let worker = null;
	let pending = null;

	const settle = (result) => {
		const waiting = pending;
		pending = null;
		waiting?.resolve(result);
	};

	const fail = (error) => {
		const waiting = pending;
		settle({
			ok: false,
			phase: 'worker',
			target: waiting?.target,
			errors: [String(error?.message ?? error)],
			output: ''
		});
	};

	const onMessage = async ({ data }) => {
		if (!data) return;
		if (data.kind === 'status') return onStatus(data.text);
		if (data.kind === 'log') return onCompilerLog(data.text);
		if (data.kind === 'progress') return onProgress(data.value);
		// The program's output, whether it came from the worker's WASI program or the frame below.
		if (data.kind === 'out' || data.kind === 'err') return onOutput(data.text, data.kind);
		if (data.kind !== 'result') return;

		const result = data.result;
		const waiting = pending;
		if (!waiting) return;

		// The JavaScript target comes back compiled and is run here; everything else has already run. The
		// target that was asked for is what says so, rather than anything in the result.
		if (waiting.target === 'js') {
			onStatus('running…');
			const runStarted = performance.now();
			const ran = await executeJavaScript(result.compiledCode, {
				onStdout: (text) => onOutput(text, 'out'),
				onStderr: (text) => onOutput(text, 'err')
			});
			settle({
				...result,
				phase: 'run',
				ok: !ran.failed,
				stdout: ran.stdout,
				stderr: ran.stderr,
				output: ran.output,
				exitCode: ran.failed ? 1 : 0,
				errors: ran.failed && ran.stderr ? [ran.stderr] : [],
				runMs: performance.now() - runStarted,
				totalMs: performance.now() - waiting.started
			});
			return;
		}

		settle(result);
	};

	const ensureWorker = () => {
		if (worker) return worker;
		worker = new Worker(workerUrl);
		worker.onmessage = onMessage;
		worker.onerror = (event) => fail(new Error(event.message || 'The worker failed to start.'));
		return worker;
	};

	return {
		/** `target` is one of `@live-codes/nim-wasm`'s, e.g. `wasm` or `js`. */
		async run(source, { target, args = [], stdin = '' } = {}) {
			if (pending) throw new Error('A run is already in progress.');
			const started = performance.now();

			return new Promise((resolve) => {
				pending = { resolve, target, started };
				ensureWorker().postMessage({ type: 'run', source, target, args, stdin, ...assets });
			});
		},

		/**
		 * Give up on the current run.
		 *
		 * Terminating is the only way to stop a build that is stuck, and it costs the warm state: the
		 * next run reloads both toolchains. That is the trade for having a way out at all.
		 */
		stop() {
			worker?.terminate();
			worker = null;
			const waiting = pending;
			if (!waiting) return;
			settle({
				ok: false,
				phase: 'stopped',
				target: waiting.target,
				errors: ['Stopped.'],
				output: '',
				totalMs: performance.now() - waiting.started
			});
		}
	};
}
