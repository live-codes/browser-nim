// Bundling entry for the browser.
//
// `src/clang-build.js` imports the Clang runtime by package name, which a browser cannot resolve on its
// own and a module worker cannot resolve with an import map. So the page is given a single bundle
// instead: `npm run bundle` writes it to `vendor/nim-playground.js`.
export { BACKENDS, createRunner } from './src/run-nim.js';
// The languages and their samples, shared with the tests so the picker cannot drift.
export { DEFAULT_LANGUAGE, LANGUAGES, samplesFor } from './src/samples.js';
