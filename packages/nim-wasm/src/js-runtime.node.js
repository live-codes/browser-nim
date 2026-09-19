// Running the JavaScript the `js` backend emitted, in Node.
//
// A fresh vm context, so the program cannot reach this process's globals, with a console the caller can
// read. There is no document here, so a program that needs one cannot run under Node — that is a property
// of the target rather than of this runner, and it is why the browser half uses a frame instead.
import vm from 'node:vm';

const asText = (value) => {
	if (typeof value === 'string') return value;
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
};

/**
 * @param {string} js - the program, as `nim js` emitted it.
 * @param {object} [options]
 * @param {(text: string) => void} [options.onStdout] - each line as it arrives, newline included.
 * @param {(text: string) => void} [options.onStderr]
 * @returns {Promise<{stdout: string, stderr: string, output: string, failed: boolean}>}
 */
export async function executeJavaScript(js, { onStdout = () => {}, onStderr = () => {} } = {}) {
	const stdout = [];
	const stderr = [];
	const order = [];

	const record = (into, notify) => (...args) => {
		const line = args.map(asText).join(' ');
		into.push(line);
		order.push(line);
		notify(`${line}\n`);
	};

	const sandbox = {
		console: {
			log: record(stdout, onStdout),
			info: record(stdout, onStdout),
			debug: record(stdout, onStdout),
			warn: record(stderr, onStderr),
			error: record(stderr, onStderr)
		}
	};

	let failed = false;
	try {
		vm.runInNewContext(js, sandbox, { filename: 'user.js' });
	} catch (error) {
		failed = true;
		const line = `${error?.name ?? 'Error'}: ${error?.message ?? error}`;
		stderr.push(line);
		order.push(line);
		onStderr(`${line}\n`);
	}

	return {
		stdout: stdout.join('\n'),
		stderr: stderr.join('\n'),
		output: order.join('\n'),
		failed
	};
}
