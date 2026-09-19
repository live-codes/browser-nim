// End-to-end test of the whole pipeline, in Node.
//
//   node --test test/pipeline.test.mjs
//
// Nim source -> C -> objects -> one wasm module -> a run. The Clang half is the real thing: the same
// `BrowserClangRuntime`, the same assets, and the same multi-translation-unit path LiveCodes would
// use, served over HTTP exactly as the page is served.
import { strict as assert } from 'node:assert';
import { after, before, describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { compileTranslationUnits, loadClangToolchain, runArtifact } from '../src/clang-build.js';
import { createNimServer } from '../serve.mjs';
import { createNodeNimCompiler, NIM_ASSET_DIR } from './nim-node-context.mjs';

const SAMPLE = `import strformat, algorithm

let name = "browser"
echo "Hello, ", name, "!"

for i in 0..4:
  echo &"i = {i}"

let xs = @[3, 1, 4, 1, 5, 9, 2, 6]
echo "sorted: ", xs.sorted

proc factorial(n: int): int =
  if n <= 1: 1 else: n * factorial(n-1)
echo "5! = ", factorial(5)
`;

const EXPECTED = [
	'Hello, browser!',
	'i = 0',
	'i = 1',
	'i = 2',
	'i = 3',
	'i = 4',
	'sorted: @[1, 1, 2, 3, 4, 5, 6, 9]',
	'5! = 120'
].join('\n');

describe('Nim in the browser pipeline', () => {
	let server;
	let clangBaseUrl;
	let nim;
	let toolchain;

	before(async () => {
		server = createNimServer();
		await new Promise((resolve) => server.listen(0, resolve));
		clangBaseUrl = `http://localhost:${server.address().port}/clang/`;
		nim = await createNodeNimCompiler();
		toolchain = await loadClangToolchain({ baseUrl: clangBaseUrl, onProgress: () => {} });
	});

	after(() => server?.close());

	const build = async (source) => {
		const generated = nim.compileToC(source);
		const translationUnits = generated.files.map((file, index) => ({
			path: `nim/unit-${String(index).padStart(3, '0')}.c`,
			content: file.content
		}));
		// A failure carries clang's own diagnostics as its message, so it needs no dressing up here.
		return compileTranslationUnits(toolchain, {
			translationUnits,
			nimbase: readFileSync(join(NIM_ASSET_DIR, 'nimbase.h'), 'utf8')
		});
	};

	it('compiles Nim to C', () => {
		const generated = nim.compileToC(SAMPLE);
		assert.ok(generated.ok, `expected generated C\n${generated.diagnostics.join('\n')}`);
		assert.ok(
			generated.files.some((file) => file.content.includes('int main')),
			'one of the units should define main'
		);
		assert.ok(
			generated.files.every((file) => file.content.includes('#include "nimbase.h"')),
			'every unit should still include nimbase.h'
		);
	});

	it('compiles the generated C into one wasm module and runs it', async () => {
		const artifact = await build(SAMPLE);
		assert.ok(artifact.bytes, 'expected a linked wasm artifact');

		const stdout = [];
		const stderr = [];
		const result = await runArtifact(toolchain, artifact, {
			onStdout: (chunk) => stdout.push(chunk),
			onStderr: (chunk) => stderr.push(chunk)
		});

		assert.equal(stderr.join(''), '', 'the program should not write to stderr');
		assert.equal(stdout.join('').trim(), EXPECTED);
		assert.equal(result.exitCode, 0);
	});

	it('reports a Nim error without reaching the C compiler', () => {
		const generated = nim.compileToC('let x: int = "not an int"\n');
		assert.equal(generated.ok, false);
		assert.ok(
			generated.diagnostics.some((line) => /Error:/.test(line)),
			`expected an error, got:\n${generated.diagnostics.join('\n')}`
		);
	});
});
