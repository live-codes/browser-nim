// The entry every environment gets unless something more specific matches, so it has to work without a
// filesystem: `baseUrl` is required because a browser cannot read a file that lives inside an npm package.
import { createApi } from './api.js';
import { executeJavaScript } from './js-runtime.js';
import { acquireNimCompiler } from './nim.js';

const api = createApi({ packaged: null, acquireNimCompiler, executeJavaScript });

export const createCompiler = api.createCompiler;
export const { TARGETS, targets } = api;
