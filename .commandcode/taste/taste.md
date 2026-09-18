# Taste

## Git / repository hygiene

- Always keep assets, `vendor` directories, build outputs, and generated bundles tracked and committed, so the repository always contains everything needed to run without building first — a build could fail against changed dependencies and lose runnable code. Only `node_modules` should be gitignored. Confidence: 0.95
