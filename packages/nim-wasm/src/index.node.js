// Node, where the assets that ship in this package can be read off disk, so `baseUrl` becomes optional
// and `createCompiler({ target: 'js' })` is enough on its own.
import { createApi } from './api.js';
import { executeJavaScript } from './js-runtime.node.js';
import { loadNimCompiler } from './nim.node.js';
import { packagedAssets } from './packaged.node.js';

const api = createApi({ packaged: packagedAssets, loadNimCompiler, executeJavaScript });

export const createCompiler = api.createCompiler;
export const { TARGETS, targets } = api;
