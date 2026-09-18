// Downloads the Nim compiler, compiled to WebAssembly.
//
// These three files are the prebuilt artifacts published by the Nim-WASM-Compiler project
// (https://github.com/benagastov/Nim-WASM-Compiler), which compiles Nim 2.2.4 to wasm with
// Emscripten. `nim.wasm` is the compiler, `nim-bundle.js` is its Emscripten loader with a small
// patch that writes `globalThis.__NIM_USER_CODE__` into the compiler's in-memory filesystem.
//
// This is the only part of the pipeline that is not already shipped by LiveCodes: the Clang 22
// half comes from `@live-codes/clang-wasm`. For production these should be built from the Nim
// sources and pinned the way the Clang assets are, rather than fetched from someone's GitHub Pages.
//
// The receipts are recorded on first download and verified on every later one, so a repointed
// upstream fails loudly instead of silently changing the compiler under us.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const SOURCE = 'https://benagastov.github.io/Nim-WASM-Compiler/static/nim/';

const ASSETS = ['nim-bundle.js', 'nim.wasm', 'nimbase.h'];

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'vendor', 'nim');
const receiptsPath = join(outDir, 'asset-receipts.json');

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

const human = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const readReceipts = async () => {
	try {
		return JSON.parse(await readFile(receiptsPath, 'utf8'));
	} catch {
		return null;
	}
};

const download = async (name) => {
	const url = new URL(name, SOURCE);
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${url} responded ${response.status}`);
	return new Uint8Array(await response.arrayBuffer());
};

const main = async () => {
	await mkdir(outDir, { recursive: true });
	const known = await readReceipts();
	const receipts = {};
	let downloaded = 0;

	for (const name of ASSETS) {
		const target = join(outDir, name);

		if (existsSync(target)) {
			const bytes = new Uint8Array(await readFile(target));
			const digest = sha256(bytes);
			const expected = known?.[name]?.sha256;
			if (expected && expected !== digest) {
				throw new Error(
					`${name} is ${digest}, expected ${expected}. Delete vendor/nim/${name} to refetch.`
				);
			}
			receipts[name] = { bytes: bytes.length, sha256: digest };
			console.log(`  ${name}  ${human(bytes.length)}  (already present)`);
			continue;
		}

		const bytes = await download(name);
		await writeFile(target, bytes);
		const digest = sha256(bytes);
		receipts[name] = { bytes: bytes.length, sha256: digest };
		downloaded += 1;
		console.log(`  ${name}  ${human(bytes.length)}  ${digest.slice(0, 16)}…`);
	}

	await writeFile(receiptsPath, `${JSON.stringify(receipts, null, 2)}\n`);
	console.log(
		downloaded
			? `\nFetched ${downloaded} file(s) into vendor/nim from ${SOURCE}`
			: '\nvendor/nim is up to date.'
	);
};

await main();
