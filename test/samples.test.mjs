// Every sample the page offers, compiled and run.
//
// The samples are shared with the page rather than copied, so this is what keeps the picker honest:
// without it a sample that fails to compile is only discovered by clicking it.
import { strict as assert } from 'node:assert';
import { after, before, describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { compileTranslationUnits, loadClangRuntime, runArtifact } from '../src/clang-build.js';
import { SAMPLES } from '../src/samples.js';
import { createNimServer } from '../serve.mjs';
import { createNodeNimCompiler, NIM_ASSET_DIR } from './nim-node-context.mjs';

// What each sample should do. The last one is meant to fail, and is here to pin down how a failing
// program is reported: a non-zero exit code with Nim's traceback, not a hang.
const EXPECTATIONS = {
	'Hello, factorial, and a sorted seq': {
		contains: 'Hello, browser!',
		exitCode: 0
	},
	'Primes with a set and a proc': {
		contains: 'found 15 primes below 50',
		exitCode: 0
	},
	'Reading a command-line argument': {
		contains: 'no program arguments were passed',
		exitCode: 0
	},
	'A runtime error, to see how it is reported': {
		contains: 'unhandled exception: division by zero',
		exitCode: 1
	}
};

describe('the page samples', () => {
	let server;
	let nim;
	let runtime;
	let compilerOutput = [];

	before(async () => {
		server = createNimServer();
		await new Promise((resolve) => server.listen(0, resolve));
		nim = await createNodeNimCompiler();
		runtime = await loadClangRuntime({
			baseUrl: `http://localhost:${server.address().port}/clang/`,
			onLog: (chunk) => compilerOutput.push(chunk),
			onProgress: () => {}
		});
	});

	after(() => server?.close());

	for (const [label, source] of Object.entries(SAMPLES)) {
		it(`runs "${label}"`, async () => {
			const expected = EXPECTATIONS[label];
			assert.ok(expected, `no expectation recorded for the sample "${label}"`);

			const generated = nim.compile(source);
			assert.ok(
				generated.ok,
				`the sample does not compile:\n${generated.diagnostics.join('\n')}`
			);

			compilerOutput = [];
			const artifact = await compileTranslationUnits(runtime, {
				translationUnits: generated.files.map((file, index) => ({
					path: `nim/unit-${String(index).padStart(3, '0')}.c`,
					content: file.content
				})),
				nimbase: readFileSync(join(NIM_ASSET_DIR, 'nimbase.h'), 'utf8')
			});

			const stdout = [];
			const stderr = [];
			const result = await runArtifact(artifact, {
				onStdout: (chunk) => stdout.push(chunk),
				onStderr: (chunk) => stderr.push(chunk)
			});

			const output = `${stdout.join('')}${stderr.join('')}`;
			assert.ok(
				output.includes(expected.contains),
				`expected ${JSON.stringify(expected.contains)} in the output, got:\n${output}\n` +
					`--- compiler output ---\n${compilerOutput.join('')}`
			);
			assert.equal(result.exitCode, expected.exitCode, `unexpected exit code, output:\n${output}`);
		});
	}
});
