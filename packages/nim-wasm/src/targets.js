// The two backends this package can drive, and what each one means.
//
// Unlike `@live-codes/clang-wasm`, there is one language here rather than a family, so which backend to
// use is an option rather than the first positional argument.
export const TARGETS = Object.freeze({
	WASM: 'wasm',
	JS: 'js'
});

const ALIASES = new Map([
	['wasm', TARGETS.WASM],
	['c', TARGETS.WASM],
	['nim-wasm', TARGETS.WASM],
	['js', TARGETS.JS],
	['javascript', TARGETS.JS],
	['nodejs', TARGETS.JS]
]);

/** Resolve a target, with the aliases a caller might reasonably reach for. */
export function resolveTarget(value) {
	const id = ALIASES.get(String(value ?? '').trim().toLowerCase());
	if (!id) {
		throw new Error(
			`Unknown target ${JSON.stringify(value)}. Expected one of: ${Object.values(TARGETS).join(', ')}.`
		);
	}
	return id;
}

export const DEFAULT_TARGET = TARGETS.WASM;
