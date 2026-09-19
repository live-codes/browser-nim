// Every sample the page offers, compiled and run — both backends.
//
// The samples are shared with the page rather than copied, so this is what keeps the picker honest:
// without it a sample that no longer compiles is only discovered by clicking it.
//
// The JavaScript samples are executed here in a `vm` context with a console the test can read, rather
// than in the sandboxed frame the page uses. That keeps the browser-only part (the frame, the
// messages) out of this test while still running the real emitted program: it is the generated
// JavaScript under test, not the harness around it.
import { strict as assert } from 'node:assert';
import { after, before, describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

import { compileTranslationUnits, loadClangToolchain, runArtifact } from '../src/clang-build.js';
import { LANGUAGES, samplesFor } from '../src/samples.js';
import { createNimServer } from '../serve.mjs';
import { createNodeNimCompiler, NIM_ASSET_DIR } from './nim-node-context.mjs';

// What each sample should do, per language. The error sample in each set is meant to fail, and is here
// to pin down how a failing program is reported rather than to demonstrate Nim.
const EXPECTATIONS = {
	'nim-wasm': {
		'Hello, factorial, and a sorted seq': { contains: ['Hello, browser!'], exitCode: 0 },
		'Primes with a set and a proc': { contains: ['found 15 primes below 50'], exitCode: 0 },
		'Reading a command-line argument': { contains: ['no program arguments were passed'], exitCode: 0 },
		'A runtime error, to see how it is reported': {
			contains: ['unhandled exception: division by zero'],
			exitCode: 1
		}
	},
	nim: {
		'Hello, factorial, and a sorted seq': {
			contains: ['Hello, browser!', 'sorted: @[1, 1, 2, 3, 4, 5, 6, 9]', '5! = 120']
		},
		// The one sample that only the JavaScript backend can run: it reaches the document.
		'Calling into JavaScript': {
			contains: [
				"the frame's body now holds: <p>Written by Nim, rendered by the browser</p>",
				'JSON.stringify, from Nim: "hello"'
			]
		},
		'A runtime error, to see how it is reported': {
			contains: ['about to divide by zero', 'division by zero']
		}
	}
};

// The host a JavaScript sample runs against. A real frame provides all of this; here only what the
// samples touch is needed, and `JSON` comes with the context.
const runJavaScript = (js) => {
	const stdout = [];
	const stderr = [];
	const document = { body: { innerHTML: '' } };
	const record = (into) => (...args) => into.push(args.map((value) => String(value)).join(' '));

	let thrown = null;
	try {
		vm.runInNewContext(js, { console: { log: record(stdout), info: record(stdout), debug: record(stdout), warn: record(stderr), error: record(stderr) }, document }, { filename: 'user.js' });
	} catch (error) {
		thrown = String(error?.message ?? error);
		stderr.push(thrown);
	}

	return { output: `${stdout.join('\n')}\n${stderr.join('\n')}`, thrown };
};

describe('the page samples', () => {
	let server;
	let nim;
	let toolchain;
	let compilerOutput = [];

	before(async () => {
		server = createNimServer();
		await new Promise((resolve) => server.listen(0, resolve));
		nim = await createNodeNimCompiler();
		toolchain = await loadClangToolchain({
			baseUrl: `http://localhost:${server.address().port}/clang/`,
			onProgress: () => {}
		});
	});

	after(() => server?.close());

	for (const language of Object.keys(LANGUAGES)) {
		describe(`${language} samples`, () => {
			for (const [label, source] of Object.entries(samplesFor(language))) {
				it(`runs "${label}"`, async () => {
					const expected = EXPECTATIONS[language][label];
					assert.ok(expected, `no expectation recorded for the ${language} sample "${label}"`);

					if (language === 'nim') {
						const generated = nim.compileToJs(source);
						assert.ok(
							generated.ok,
							`the sample does not compile:\n${generated.diagnostics.join('\n')}`
						);

						const { output } = runJavaScript(generated.js);
						for (const fragment of expected.contains) {
							assert.ok(
								output.includes(fragment),
								`expected ${JSON.stringify(fragment)} in the output, got:\n${output}`
							);
						}
						return;
					}

					const generated = nim.compileToC(source);
					assert.ok(
						generated.ok,
						`the sample does not compile:\n${generated.diagnostics.join('\n')}`
					);

					compilerOutput = [];
					const artifact = await compileTranslationUnits(toolchain, {
						translationUnits: generated.files.map((file, index) => ({
							path: `nim/unit-${String(index).padStart(3, '0')}.c`,
							content: file.content
						})),
						nimbase: readFileSync(join(NIM_ASSET_DIR, 'nimbase.h'), 'utf8'),
						onCompilerOutput: (raw) => compilerOutput.push(raw)
					});

					const stdout = [];
					const stderr = [];
					const result = await runArtifact(toolchain, artifact, {
						onStdout: (chunk) => stdout.push(chunk),
						onStderr: (chunk) => stderr.push(chunk)
					});

					const output = `${stdout.join('')}${stderr.join('')}`;
					for (const fragment of expected.contains) {
						assert.ok(
							output.includes(fragment),
							`expected ${JSON.stringify(fragment)} in the output, got:\n${output}\n` +
								`--- compiler output ---\n${compilerOutput.join('')}`
						);
					}
					assert.equal(result.exitCode, expected.exitCode, `unexpected exit code, output:\n${output}`);
				});
			}
		});
	}
});
