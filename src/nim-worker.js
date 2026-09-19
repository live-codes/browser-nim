// The worker side: everything that compiles, off the page's thread.
//
// The Clang runtime blocks whatever thread it runs on for the whole of a compile — seconds for the
// WebAssembly target — and the Nim compiler blocks too. Both happen here, so the page stays responsive
// while a build is running, and a build that never finishes can be killed by terminating this worker.
//
// What it does not do is run the JavaScript target's program: that needs a document, so the page owns it,
// and the hand-off is `execute: false`. See `src/playground.js` for that half.
//
// This is bundled to a classic worker rather than loaded as a module, because the Nim compiler's
// Emscripten bundle has to be evaluated with `importScripts` to see itself as being in a worker at all.
import { createCompiler } from '@live-codes/nim-wasm';

// One compiler per target, because the target is fixed when a compiler is created. The Nim compiler
// underneath is shared either way, so the second one costs nothing to make.
const compilers = new Map();
let running = false;

const post = (message) => self.postMessage(message);

const failed = (target, phase, errors) => ({
	ok: false,
	phase,
	target,
	errors,
	output: ''
});

const compilerFor = async (message, target) => {
	if (!compilers.has(target)) {
		compilers.set(
			target,
			await createCompiler({
				target,
				baseUrl: message.nimBaseUrl,
				clangBaseUrl: message.clangBaseUrl,
				args: message.args ?? [],
				onStatus: (text) => post({ kind: 'status', text }),
				onLog: (text) => post({ kind: 'log', text }),
				onProgress: (value) => post({ kind: 'progress', value }),
				// The program's output as it is written, so the page can show a slow program while it
				// runs instead of waiting for the whole thing.
				onOutput: (text, stream) => post({ kind: stream, text })
			})
		);
	}
	return compilers.get(target);
};

self.onmessage = async (event) => {
	const message = event.data;
	if (!message || message.type !== 'run') return;

	// One run at a time. The Nim compiler owns one filesystem and the Clang runtime one compiler process,
	// so a second run would write over the first's files and redirect its output.
	if (running) {
		post({ kind: 'result', result: failed(message.target, 'busy', ['A run is already in progress.']) });
		return;
	}
	running = true;

	try {
		// The page sends the package's target, not the language it offers, so there is nothing to map here.
		const target = message.target;
		const compiler = await compilerFor(message, target);

		// Everything but the JavaScript target's program runs here; that one is compiled here and sent
		// back for the page to run in a frame.
		const result = await compiler.run(message.source, message.stdin, {
			args: message.args,
			execute: target === 'js' ? false : undefined
		});
		post({ kind: 'result', result });
	} catch (error) {
		// A failure here is the harness, not the program — a missing asset, say.
		post({ kind: 'result', result: failed(message.target, 'worker', [String(error?.message ?? error)]) });
	} finally {
		running = false;
	}
};
