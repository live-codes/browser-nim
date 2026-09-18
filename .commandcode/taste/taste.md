# Taste

## Git / repository hygiene

- Always keep assets, `vendor` directories, build outputs, and generated bundles tracked and committed, so the repository always contains everything needed to run without building first — a build could fail against changed dependencies and lose runnable code. Only things that are not needed to run may be gitignored: `node_modules` and throwaway `scratch` directories. Confidence: 0.97
- Throwaway scratch/probe directories may live inside the repo as long as they are gitignored — no need to move temporary work to an out-of-repo session scratchpad. Confidence: 0.9
