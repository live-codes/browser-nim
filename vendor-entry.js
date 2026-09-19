// Bundling entry for the page.
//
// Two bundles come out of `npm run bundle`, because the two threads need different halves:
//
//   vendor/nim-playground.js  this file — the page: the worker's handle, the frame the JavaScript
//                             target runs in, and the languages and samples
//   vendor/nim-worker.js      src/nim-worker.js — the worker: the Nim compiler and the Clang runtime
//
// They are deliberately disjoint. The Clang runtime is a third of a megabyte and only the worker needs
// it, so the page does not carry it and it is fetched when the worker is first created rather than on
// load. Nothing here may import `./src/clang-build.js` or `./src/run-nim.js`, or it will be pulled back
// in.
export { createPlayground } from './src/playground.js';
// The languages and their samples, shared with the tests so the picker cannot drift.
export { DEFAULT_LANGUAGE, LANGUAGES, samplesFor } from './src/samples.js';
