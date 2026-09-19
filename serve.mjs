// Static server for the Nim playground proof of concept.
//
//   node serve.mjs        # http://localhost:4180
//
// Serves three things from one origin, which is what lets the page fetch both toolchains without CORS
// and without a second host:
//   /         the page
//   /nim/*    the Nim compiler assets (vendor/nim)
//   /clang/*  the Clang 22 toolchain assets (vendor/clang) — the same tree LiveCodes serves for
//             C/C++ and Objective-C, copied out of the package with its own `clang-wasm-copy-assets`
//
// gzip matters here, and in a way that is easy to get backwards: the clang assets are stored
// compressed and the runtime gunzips them itself (its `maxAssetBytes` ceiling is about the
// *decompressed* size). So `.gz` files are served as the raw gzip bytes they are, with
// `content-type: application/gzip` and NO `content-encoding` header — `content-encoding: gzip` would
// make the browser inflate them first and hand the runtime something that is not a gzip stream.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.wasm': 'application/wasm',
	'.css': 'text/css; charset=utf-8',
	'.h': 'text/plain; charset=utf-8',
	'.gz': 'application/gzip',
	'.tar': 'application/x-tar',
	'.a': 'application/octet-stream',
	'.png': 'image/png'
};

const send = (res, status, headers, body) => {
	res.writeHead(status, { 'cache-control': 'no-cache', ...headers });
	res.end(body);
};

const serveFile = async (res, file) => {
	if (!existsSync(file) || (await stat(file)).isDirectory()) {
		send(res, 404, { 'content-type': 'text/plain; charset=utf-8' }, `Not found: ${file}`);
		return;
	}
	const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream';
	send(res, 200, { 'content-type': type }, await readFile(file));
};

// Serve the name asked for; if it is not there, try it with `.gz` appended. The runtime normally asks
// for the gzipped names directly, so this is only a fallback for a manifest that omits the suffix.
const serveAsset = async (res, baseDir, relative) => {
	if (relative.split('/').includes('..')) {
		send(res, 403, { 'content-type': 'text/plain; charset=utf-8' }, 'Forbidden');
		return;
	}
	const direct = join(baseDir, normalize(relative));
	if (existsSync(direct)) return serveFile(res, direct);
	if (existsSync(`${direct}.gz`)) return serveFile(res, `${direct}.gz`);
	return serveFile(res, direct);
};

/** The playground's static server. Not listening until `listen` is called. */
export function createNimServer({ root = resolve(import.meta.dirname) } = {}) {
	const server = createServer(async (req, res) => {
		try {
			const requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

			if (requested.startsWith('/clang/')) {
				return await serveAsset(res, join(root, 'vendor', 'clang'), requested.slice('/clang/'.length));
			}
			if (requested.startsWith('/nim/')) {
				return await serveAsset(
					res,
					join(root, 'packages', 'nim-wasm', 'assets', 'nim'),
					requested.slice('/nim/'.length)
				);
			}

			const target = resolve(join(root, normalize(requested === '/' ? '/index.html' : requested)));
			if (target !== root && !target.startsWith(root + sep)) {
				send(res, 403, { 'content-type': 'text/plain; charset=utf-8' }, 'Forbidden');
				return;
			}
			await serveFile(res, target);
		} catch (error) {
			// An async handler that rejects would be an unhandled rejection and take the process down,
			// turning one bad request into connection resets on every later one.
			if (res.headersSent) res.destroy();
			else send(res, 500, { 'content-type': 'text/plain; charset=utf-8' }, `request failed: ${error}\n`);
		}
	});

	// Browsers pool connections and will reuse one the server has closed after its idle timeout, which
	// shows up as a random ECONNRESET on whatever request is next. Cheap to avoid.
	server.keepAliveTimeout = 60_000;
	server.headersTimeout = 65_000;
	return server;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.dirname, 'serve.mjs');

if (isMain) {
	const port = Number(process.env.PORT || 4180);
	createNimServer().listen(port, () => {
		console.log(`Nim playground on http://localhost:${port}/`);
		console.log(`  Nim compiler assets:  http://localhost:${port}/nim/`);
		console.log(`  Clang toolchain:      http://localhost:${port}/clang/`);
	});
}
