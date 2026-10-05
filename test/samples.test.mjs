// Every sample the page offers, compiled and run through the package, against the assets the page
// serves.
//
// The samples live in `src/samples.js` and are shared with the page, so this is what keeps the picker
// honest: without it a sample that no longer compiles is only discovered by clicking it. Going through
// the package with a baseUrl also covers the hosted asset path, which the package's own tests do not —
// those read the assets off disk.
import { strict as assert } from 'node:assert';
import { after, before, describe, it } from 'node:test';

import { createCompiler } from '@live-codes/nim-wasm';

import { LANGUAGES, samplesFor } from '../src/samples.js';
import { createNimServer } from '../serve.mjs';

// What each sample should do, per target. The error sample in each set is meant to fail, and is here to
// pin down how a failing program is reported rather than to demonstrate Nim.
const EXPECTATIONS = {
	wasm: {
		'Hello, factorial, and a sorted seq': { contains: ['Hello, browser!'], exitCode: 0 },
		'Primes with a set and a proc': { contains: ['found 15 primes below 50'], exitCode: 0 },
		'Reading a command-line argument': { contains: ['no program arguments were passed'], exitCode: 0 },
		'A runtime error, to see how it is reported': {
			contains: ['unhandled exception: division by zero'],
			exitCode: 1
		}
	},
	js: {
		'Hello, factorial, and a sorted seq': {
			contains: ['Hello, browser!', 'sorted: @[1, 1, 2, 3, 4, 5, 6, 9]', '5! = 120']
		},
		// The one sample only this target can run: it reaches the document. Under Node there is no document
		// to reach, and that is what this can assert here — the sample is verified for real in the browser,
		// where the page runs it in a frame.
		'Calling into JavaScript': { contains: ['document is not defined'] },
		// Browser-only for the same reason, and a wider slice of the dom module than the sample above:
		// verified for real in the browser, where the frame supplies the document.
		'Building a page with the dom module': { contains: ['document is not defined'] },
		'A runtime error, to see how it is reported': { contains: ['division by zero'] }
	}
};

describe('the page samples', () => {
	let server;
	let nimBaseUrl;
	let clangBaseUrl;

	before(async () => {
		server = createNimServer();
		await new Promise((resolve) => server.listen(0, resolve));
		const origin = `http://localhost:${server.address().port}/`;
		nimBaseUrl = `${origin}nim/`;
		clangBaseUrl = `${origin}clang/`;
	});

	after(() => server?.close());

	for (const [language, { target }] of Object.entries(LANGUAGES)) {
		describe(`${target} samples`, () => {
			for (const [label, source] of Object.entries(samplesFor(language))) {
				it(`runs "${label}"`, async () => {
					const expected = EXPECTATIONS[target][label];
					assert.ok(expected, `no expectation recorded for the ${target} sample "${label}"`);

					const compiler = await createCompiler({ target, baseUrl: nimBaseUrl, clangBaseUrl });
					const result = await compiler.run(source);

					assert.deepEqual(
						result.errors,
						[],
						`the sample did not compile or failed:\n${result.errors.join('\n')}`
					);
					for (const fragment of expected.contains) {
						assert.ok(
							result.output.includes(fragment),
							`expected ${JSON.stringify(fragment)} in the output, got:\n${result.output}`
						);
					}
					if (expected.exitCode !== undefined) {
						assert.equal(result.exitCode, expected.exitCode, `unexpected exit code:\n${result.output}`);
					}
				});
			}
		});
	}
});
