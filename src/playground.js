// The page side: owns the worker that compiles, and the frame that runs what it compiles.
//
// The split is forced by one thing — the JavaScript target's program needs a document, and a worker has
// none — and it pays for itself twice over. Compiling leaves the page's thread, so neither the Nim
// compiler nor the Clang runtime can freeze it; and a build that runs away can be killed, because
// discarding a worker is a real way to stop it.
//
// The JavaScript target's *program* is the exception: it runs in a frame on this thread, because the
// DOM is the reason to use that target at all. That also means a program of its own that loops forever
// still hangs the page, and no stop button can reach it. Running it somewhere killable would mean
// running it without a document.
import { runProgram } from './nim-js-runtime.js';

export function createPlayground({
	// Where `npm run bundle` writes the worker. Only the bundling convention is assumed; pass a URL to
	// host it somewhere else.
	workerUrl = './vendor/nim-worker.js',
	nimBaseUrl,
	clangBaseUrl,
	onStatus = () => {},
	onCompilerLog = () => {},
	onProgress = () => {}
}) {
	// Resolved here because a worker resolves relative URLs against its own script, not the page.
	const assets = {
		nimBaseUrl: new URL(nimBaseUrl, document.baseURI).href,
		clangBaseUrl: new URL(clangBaseUrl, document.baseURI).href
	};

	let worker = null;
	let pending = null;

	const settle = (result, { stripProgram = false } = {}) => {
		const waiting = pending;
		pending = null;
		if (!waiting) return;

		if (stripProgram) {
			// The program is already in `compiledCode`; sending it back as well would duplicate it.
			const { js, ...rest } = result;
			waiting.resolve(rest);
			return;
		}
		waiting.resolve(result);
	};

	const fail = (error) => {
		const waiting = pending;
		settle({
			ok: false,
			phase: 'worker',
			backend: waiting?.backend,
			errors: [String(error?.message ?? error)],
			output: ''
		});
	};

	const onMessage = async ({ data }) => {
		if (!data) return;
		if (data.kind === 'status') return onStatus(data.text);
		if (data.kind === 'log') return onCompilerLog(data.text);
		if (data.kind === 'progress') return onProgress(data.value);
		if (data.kind !== 'result') return;

		const result = data.result;
		const waiting = pending;
		if (!waiting) return;

		// The JavaScript target comes back compiled and is run here; everything else has already run.
		if (result.js) {
			onStatus('running…');
			const runStarted = performance.now();
			const ran = await runProgram(result.js);
			const merged = {
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
			};
			settle(merged, { stripProgram: true });
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
		async run(source, { backend, args = [], stdin = '' } = {}) {
			if (pending) throw new Error('A run is already in progress.');
			const started = performance.now();

			const result = await new Promise((resolve) => {
				pending = { resolve, backend, started };
				ensureWorker().postMessage({
					type: 'run',
					source,
					backend,
					args,
					stdin,
					...assets
				});
			});

			return result;
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
				backend: waiting.backend,
				errors: ['Stopped.'],
				output: '',
				totalMs: performance.now() - waiting.started
			});
		}
	};
}
