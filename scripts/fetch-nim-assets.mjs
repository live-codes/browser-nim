// Pins the Nim compiler's WebAssembly artifacts, and verifies vendor/nim against the pin.
//
//   node scripts/fetch-nim-assets.mjs                fetch what is missing, then verify everything
//   node scripts/fetch-nim-assets.mjs --verify-only  verify only, no network
//   node scripts/fetch-nim-assets.mjs --update       re-pin: write the lock from what is fetched
//
// The pin is `nim-assets.lock.json` at the repository root, committed. It is the *expectation*: this
// script never rewrites it except under `--update`, so an upstream that has moved, or a download that
// arrived corrupted, fails loudly instead of quietly becoming the new truth. That is the difference
// between a pin and a receipt — a receipt is whatever was fetched last, which is no expectation at all.
//
// What is pinned is a third-party prebuilt bundle: Nim 2.2.4 compiled to wasm by the Nim-WASM-Compiler
// project, plus a patched Emscripten loader. The provenance is in the lock; the README says what
// building it in-house would take.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'vendor', 'nim');
const lockPath = join(root, 'nim-assets.lock.json');

const args = new Set(process.argv.slice(2));
const updating = args.has('--update');
const verifyOnly = args.has('--verify-only');

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const human = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const readLock = async () => {
	try {
		return JSON.parse(await readFile(lockPath, 'utf8'));
	} catch {
		return null;
	}
};

const lock = await readLock();
if (!lock && !updating) {
	throw new Error(
		`${lockPath} is missing. It is the pin, and it is committed - restore it, or create one ` +
			'deliberately with --update.'
	);
}
if (!lock && verifyOnly) throw new Error('--verify-only needs the lock, and there is none to read.');

const source = lock?.source?.url ?? null;
const expected = lock?.assets ?? {};

if (!source && !verifyOnly) {
	throw new Error('The lock has no source.url, so there is nothing to fetch from.');
}

// The lock's own order, so a re-pin reports in a stable order.
const names = Object.keys(expected);

const download = async (name) => {
	const url = new URL(name, source);
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${url} responded ${response.status}`);
	return new Uint8Array(await response.arrayBuffer());
};

const mismatch = (name, bytes, digest) =>
	new Error(
		`${name} does not match the pin.\n` +
			`  expected ${expected[name].sha256} (${expected[name].bytes} bytes)\n` +
			`  actual   ${digest} (${bytes.length} bytes)\n` +
			'If upstream has genuinely changed, read what changed and re-pin with --update.'
	);

await mkdir(outDir, { recursive: true });

const assets = {};
let downloaded = 0;

for (const name of names) {
	const target = join(outDir, name);
	const present = existsSync(target);
	let bytes;

	if (present) {
		bytes = new Uint8Array(await readFile(target));
	} else if (verifyOnly) {
		throw new Error(`${name} is not in vendor/nim, and --verify-only will not fetch it.`);
	} else {
		bytes = await download(name);
	}

	const digest = sha256(bytes);

	if (updating) {
		assets[name] = { bytes: bytes.length, sha256: digest };
	} else if (digest !== expected[name]?.sha256) {
		throw mismatch(name, bytes, digest);
	}

	if (!present && !verifyOnly) {
		await writeFile(target, bytes);
		downloaded += 1;
	}

	const state = updating ? 'pinned' : present ? 'present, verified' : 'fetched, verified';
	console.log(`  ${name}  ${human(bytes.length)}  ${state}`);
}

if (updating) {
	await writeFile(lockPath, `${JSON.stringify({ ...lock, assets }, null, 2)}\n`);
	console.log(`\nRe-pinned ${names.length} asset(s) in ${lockPath}. Review the diff before committing.`);
} else {
	console.log(
		`\n${names.length} asset(s) verified against the pin` +
			(downloaded ? `, ${downloaded} fetched from ${source}` : '') +
			'.'
	);
}
