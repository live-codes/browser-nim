// Probe: does the wasm-hosted Nim compiler have the JS backend, and what does it emit?
import { createNodeNimCompiler } from '../test/nim-node-context.mjs';

const JS_ARGS = [
	'js',
	'--hints:off',
	'--nimcache:/tmp/nimcache',
	'-o:/tmp/user.js',
	'/tmp/user.nim'
];

const nim = await createNodeNimCompiler({ compileArgs: JS_ARGS });

console.log('--- compiler stdlib for the JS backend ---');
console.log('/lib/system :', nim.listOther('/lib/system'));
console.log('/lib        :', nim.listOther('/lib'));

const started = Date.now();
const result = nim.compile('echo "hi from js", 1.0 / 3.0\n');
console.log(`\nnim js took ${Date.now() - started}ms, exit=${result.exitCode}`);
console.log('diagnostics:');
console.log(result.diagnostics.join('\n') || '(none)');
console.log('\nnimcache files:', result.files.map((file) => file.name).join(' ') || '(none)');
console.log('/tmp:', nim.listOther('/tmp'));
