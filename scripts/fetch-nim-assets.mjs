// Fetches the Nim compiler's WebAssembly artifacts, and verifies them against the pin.
//
//   node scripts/fetch-nim-assets.mjs                fetch what is missing, then verify everything
//   node scripts/fetch-nim-assets.mjs --verify-only   verify only, no network
//   node scripts/fetch-nim-assets.mjs --update        print the receipts for a deliberate re-pin
//
// The pin is `packages/nim-wasm/src/asset-receipts.js`, which the package ships and verifies against on
// every read — so it is the expectation, and this script never rewrites it. That is the difference
// between a pin and a receipt: a receipt is whatever was fetched last, which is no expectation at all.
//
// The assets are committed, so this is only needed if they go missing, or to move the pin deliberately.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { ASSET_RECEIPTS, ASSET_SOURCE } from '../packages/nim-wasm/src/asset-receipts.js';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'packages', 'nim-wasm', 'assets', 'nim');
const source = ASSET_SOURCE.url;

const args = new Set(process.argv.slice(2));
const updating = args.has('--update');
const verifyOnly = args.has('--verify-only');

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const human = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const mismatch = (name, bytes, digest) =>
	new Error(
		`${name} does not match the pin.\n` +
			`  expected ${ASSET_RECEIPTS[name].sha256} (${ASSET_RECEIPTS[name].bytes} bytes)\n` +
			`  actual   ${digest} (${bytes.length} bytes)\n` +
			'If upstream has genuinely changed, read what changed and re-pin with --update.'
	);

if (verifyOnly && !existsSync(outDir)) {
	throw new Error(`${outDir} is not there, and --verify-only will not fetch it.`);
}
await mkdir(outDir, { recursive: true });

const names = Object.keys(ASSET_RECEIPTS);
const fresh = {};
let downloaded = 0;

for (const name of names) {
	const target = join(outDir, name);
	const present = existsSync(target);
	let bytes;

	if (present) {
		bytes = new Uint8Array(await readFile(target));
	} else if (verifyOnly) {
		throw new Error(`${name} is not in ${outDir}, and --verify-only will not fetch it.`);
	} else {
		const url = new URL(name, source);
		const response = await fetch(url);
		if (!response.ok) throw new Error(`${url} responded ${response.status}`);
		bytes = new Uint8Array(await response.arrayBuffer());
	}

	const digest = sha256(bytes);
	fresh[name] = { bytes: bytes.length, sha256: digest };

	if (!updating && digest !== ASSET_RECEIPTS[name]?.sha256) throw mismatch(name, bytes, digest);

	if (!present && !verifyOnly) {
		await writeFile(target, bytes);
		downloaded += 1;
	}

	console.log(
		`  ${name}  ${human(bytes.length)}  ${present ? 'present, verified' : 'fetched, verified'}`
	);
}

if (updating) {
	// Source, not data: the receipts live in a module the package imports, so a re-pin is a small edit
	// somebody reads rather than a file written behind their back.
	console.log('\nReceipts as they are now, for packages/nim-wasm/src/asset-receipts.js:\n');
	console.log(`export const ASSET_RECEIPTS = Object.freeze(${JSON.stringify(fresh, null, '\t')});`);
} else {
	console.log(
		`\n${names.length} asset(s) verified against the pin` +
			(downloaded ? `, ${downloaded} fetched from ${source}` : '') +
			'.'
	);
}
