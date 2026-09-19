// What could be trimmed from a `nim-wasm` module, and what it would cost.
//
//   node scripts/measure-wasm-size.mjs
//
// Two families of lever, measured on one sample: the link line, and the flags handed to Nim. The numbers
// here are the reason the C target keeps the runtime's own link line and `-d:release` — see the README.
// Re-run it after bumping either toolchain, since both sets of numbers are properties of them.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { CLANG_DRIVER_DEFAULT_ARGS } from '@live-codes/clang-wasm/toolchain';

import { compileTranslationUnits, loadClangToolchain } from '../src/clang-build.js';
import { NIM_C_COMPILE_ARGS } from '../src/nim-compiler.js';
import { WASI_SIGNAL_HEADER, WASI_SIGNAL_HEADER_PATH } from '../src/wasi-signal-header.js';
import { createNimServer } from '../serve.mjs';
import { createNodeNimCompiler, NIM_ASSET_DIR } from '../test/nim-node-context.mjs';

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

const FAILING = `proc divide(a, b: int): int = a div b
echo divide(10, 0)
`;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

// `compileTranslationUnits` rewrites Nim's three-argument `main` for WASI's entry point, and a
// hand-built link line goes around it — the program traps in `__main_void` with a null argv without it.
const NIM_THREE_ARG_MAIN = /int\s+main\s*\(\s*int\s+(\w+)\s*,\s*char\s*\*\*\s*(\w+)\s*,\s*char\s*\*\*\s*(\w+)\s*\)\s*\{/;
const adaptMainSignature = (content) =>
	content.replace(NIM_THREE_ARG_MAIN, 'int main(int $1, char** $2) {\n\tchar** $3 = (char**)0;');

const server = createNimServer();
await new Promise((resolve) => server.listen(0, resolve));
const nim = await createNodeNimCompiler();
const toolchain = await loadClangToolchain({
	baseUrl: `http://localhost:${server.address().port}/clang/`,
	onProgress: () => {}
});
const { runtime } = toolchain;
const nimbase = readFileSync(join(NIM_ASSET_DIR, 'nimbase.h'), 'utf8');

const unitsFor = (source, args) =>
	nim
		.compileToC(source, { args })
		.files.map((file, index) => ({ path: `${index}.c`, content: file.content }));

// Flags have to land before the source path; `-d:danger` replaces `-d:release` rather than joining it.
const withFlags = (extra, { drop = [] } = {}) => {
	const args = NIM_C_COMPILE_ARGS.filter((arg) => !drop.includes(arg));
	const at = args.indexOf('/tmp/user.nim');
	return [...args.slice(0, at), ...extra, ...args.slice(at)];
};

const run = async (artifact) => {
	const ran = await toolchain.execute(artifact, {});
	return {
		ok: String(ran.stdout ?? '').includes('5! = 120'),
		exitCode: ran.exitCode,
		text: `${ran.stdout ?? ''}${ran.stderr ?? ''}`.trim().replace(/\s+/g, ' ')
	};
};

// --- the link line --------------------------------------------------------------------------------
// Building every unit here instead of calling `compileArtifact`, so the link line can be varied. This is
// what the package's Objective-C driver does for its own line.

// Mounting twice is a no-op: memfs rejects a duplicate node, and the builds below mount these again.
for (const [path, content] of [
	[WASI_SIGNAL_HEADER_PATH, WASI_SIGNAL_HEADER],
	['include/nimbase.h', nimbase]
]) {
	try {
		toolchain.addFile(path, content);
	} catch {
		// Already mounted.
	}
}

const buildWithLink = async (label, { functionSections = false, linkExtra = [] } = {}) => {
	const compileArgs = [
		...CLANG_DRIVER_DEFAULT_ARGS,
		...(functionSections ? ['-ffunction-sections', '-fdata-sections'] : [])
	];
	const units = unitsFor(SAMPLE, NIM_C_COMPILE_ARGS);

	const objects = [];
	for (const [index, unit] of units.entries()) {
		const input = `${label}/t${index}.c`;
		const obj = `${label}/t${index}.o`;
		await toolchain.lock(() =>
			toolchain.captureCompilerOutput(() =>
				runtime.compile({ input, code: adaptMainSignature(unit.content), obj, language: 'C', compileArgs })
			)
		);
		objects.push(obj);
	}

	const libdir = 'lib/wasm32-wasi';
	const runtimeLibDir = runtime.compilerConfig?.compilerRuntimeLibDir ?? 'lib/clang/22/lib/wasi';
	const lld = await runtime.getModule(runtime.assetUrls.lld);
	await toolchain.lock(() =>
		toolchain.captureCompilerOutput(() =>
			runtime.run(
				lld,
				runtime.log,
				'wasm-ld',
				...linkExtra,
				'-z',
				'stack-size=1048576',
				`-L${libdir}/noeh`,
				`-L${libdir}`,
				`${libdir}/crt1.o`,
				...objects,
				'-lc',
				'-lc++',
				'-lc++abi',
				'-lm',
				`-L${runtimeLibDir}`,
				'-lclang_rt.builtins-wasm32',
				'-o',
				`${label}.wasm`
			)
		)
	);

	const bytes = Uint8Array.from(runtime.memfs.getFileContents(`${label}.wasm`));
	const outcome = await run({ bytes, target: 'wasm32-wasi', format: 'wasi-core-wasm', fileName: label });
	console.log(`  ${label.padEnd(22)} ${kb(bytes.length).padStart(6)}   runs: ${outcome.ok ? 'yes' : 'NO'}`);
	return bytes.length;
};

// --- the Nim flags --------------------------------------------------------------------------------
// These use the runtime's own link line, so only what the flags do to the generated C shows up.

const buildWithFlags = async (label, source, extra, { drop = [] } = {}) => {
	const args = withFlags(extra, { drop });
	const generated = nim.compileToC(source, { args });
	if (!generated.ok) {
		console.log(`  ${label.padEnd(22)} did not compile: ${generated.diagnostics.join(' / ')}`);
		return null;
	}
	const artifact = await compileTranslationUnits(toolchain, {
		translationUnits: unitsFor(source, args).map((unit, index) => ({
			path: `nim/${label}/u${String(index).padStart(3, '0')}.c`,
			content: unit.content
		})),
		nimbase
	});
	const outcome = await run(artifact);
	console.log(
		`  ${label.padEnd(22)} ${kb(artifact.bytes.byteLength).padStart(6)}   runs: ${outcome.ok ? 'yes' : 'NO'}`
	);
	return artifact.bytes.byteLength;
};

console.log(`baseline, ${unitsFor(SAMPLE, NIM_C_COMPILE_ARGS).length} translation units`);

console.log('\nlink line:');
const baseline = await buildWithLink('package line', { linkExtra: ['--export-dynamic'] });
const collected = await buildWithLink('gc-sections', {
	functionSections: true,
	linkExtra: ['--export-dynamic', '--gc-sections']
});
const unexported = await buildWithLink('gc, no export-dynamic', {
	functionSections: true,
	linkExtra: ['--gc-sections']
});
const stripped = await buildWithLink('gc, stripped', {
	functionSections: true,
	linkExtra: ['--gc-sections', '--strip-all']
});

console.log('\nNim flags:');
await buildWithFlags('release, orc', SAMPLE, []);
await buildWithFlags('--mm:arc', SAMPLE, ['--mm:arc']);
await buildWithFlags('--panics:on', SAMPLE, ['--panics:on']);
await buildWithFlags('danger', SAMPLE, ['-d:danger'], { drop: ['-d:release'] });
await buildWithFlags('danger, arc', SAMPLE, ['-d:danger', '--mm:arc'], { drop: ['-d:release'] });

console.log('\nwhat a failing program reports:');
for (const [label, extra, options] of [
	['release', [], {}],
	['danger', ['-d:danger'], { drop: ['-d:release'] }]
]) {
	const args = withFlags(extra, options);
	const artifact = await compileTranslationUnits(toolchain, {
		translationUnits: unitsFor(FAILING, args).map((unit, index) => ({
			path: `nim/fail-${label}/u${index}.c`,
			content: unit.content
		})),
		nimbase
	});
	const outcome = await run(artifact);
	console.log(`  ${label.padEnd(22)} exit ${String(outcome.exitCode).padEnd(4)} ${outcome.text.slice(0, 100)}`);
}

const saved = (n) => `${Math.round((1 - n / baseline) * 100)}%`;
console.log(
	`\nlink line against the package's own: gc-sections ${saved(collected)}, ` +
		`plus no --export-dynamic ${saved(unexported)}, plus --strip-all ${saved(stripped)}`
);

server.close();
