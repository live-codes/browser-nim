// Bundling entry for the browser.
//
// `src/clang-build.js` imports the Clang runtime by package name, which a browser cannot resolve on its
// own and a module worker cannot resolve with an import map. So the page is given a single bundle
// instead: `npm run bundle` writes it to `vendor/nim-playground.js`.
export { createRunner } from './src/run-nim.js';
// The page's sample programs, shared with the tests so the picker cannot drift.
export { DEFAULT_SAMPLE, SAMPLES } from './src/samples.js';
