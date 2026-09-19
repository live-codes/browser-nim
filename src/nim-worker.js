// The worker side of the pipeline: everything that compiles, off the page's thread.
//
// The Clang runtime blocks whatever thread it runs on for the whole of a compile — seconds for the C
// target — and the Nim compiler blocks too. Both happen here, so the page stays responsive while a
// build is running, and a build that never finishes can be killed by terminating this worker.
//
// What it does not do is run the JavaScript target's program: that needs a document, so the page owns
// it. See `src/playground.js` for the other half.
//
// This is bundled to a classic worker rather than loaded as a module, because the Nim compiler's
// Emscripten bundle has to be evaluated with `importScripts` to see itself as being in a worker at all.
import { createRunner } from './run-nim.js';

let runner = null;
let running = false;

const post = (message) => self.postMessage(message);

const failed = (backend, phase, errors) => ({
	ok: false,
	phase,
	backend,
	errors,
	output: ''
});

self.onmessage = async (event) => {
	const message = event.data;
	if (!message || message.type !== 'run') return;

	// One run at a time. The Nim compiler owns one filesystem and the Clang runtime one compiler
	// process, so a second run would write over the first's files and redirect its output.
	if (running) {
		post({
			kind: 'result',
			result: failed(message.backend, 'busy', ['A run is already in progress.'])
		});
		return;
	}
	running = true;

	try {
		if (!runner) {
			runner = createRunner({
				nimBaseUrl: message.nimBaseUrl,
				clangBaseUrl: message.clangBaseUrl,
				onStatus: (text) => post({ kind: 'status', text }),
				onCompilerLog: (text) => post({ kind: 'log', text }),
				onProgress: (value) => post({ kind: 'progress', value }),
				// The program's output as it is written, so the page can show a slow program while it
				// runs instead of waiting for the whole thing.
				onOutput: (text, stream) => post({ kind: stream, text })
			});
		}

		const result = await runner.run(message.source, {
			backend: message.backend,
			args: message.args,
			stdin: message.stdin
		});
		post({ kind: 'result', result });
	} catch (error) {
		// A failure here is the harness, not the program — a missing asset, say.
		post({ kind: 'result', result: failed(message.backend, 'worker', [String(error?.message ?? error)]) });
	} finally {
		running = false;
	}
};
