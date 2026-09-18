// The programs the page offers, one set per language.
//
// They live here rather than inside index.html so that the same source the page runs is the source the
// tests run — a sample that no longer compiles would otherwise only be found by clicking it.
//
// The two sets are not variations of each other. The JavaScript backend runs in a document and can
// call into JavaScript, so its samples use that; the WebAssembly backend has a real runtime and real
// program arguments, so its samples use those. Several programs have no counterpart: `import os` and
// `commandLineParams` do not exist on the JavaScript backend, and neither does `importc`.

const SHARED = `import strformat, algorithm

let name = "browser"
echo "Hello, ", name, "!"

for i in 0..4:
  echo &"i = {i}"

let xs = @[3, 1, 4, 1, 5, 9, 2, 6]
echo "sorted: ", xs.sorted

proc factorial(n: int): int =
  if n <= 1: 1 else: n * factorial(n-1)
echo "5! = ", factorial(5)
`;

export const LANGUAGES = Object.freeze({
	'nim-wasm': {
		label: 'Nim (WebAssembly)',
		description: 'Compiled to C, then to WebAssembly with the Clang toolchain. Real Nim semantics.',
		samples: {
			'Hello, factorial, and a sorted seq': SHARED,

			'Primes with a set and a proc': `import strutils, sequtils

proc primesBelow(limit: int): seq[int] =
  result = @[]
  var composite = newSeq[bool](limit)
  for n in 2 ..< limit:
    if not composite[n]:
      result.add n
      var multiple = n * n
      while multiple < limit:
        composite[multiple] = true
        multiple += n

let primes = primesBelow(50)
echo "found ", primes.len, " primes below 50"
echo primes.mapIt($it).join(", ")
`,

			'Reading a command-line argument': `import os, strutils

let args = commandLineParams()
if args.len == 0:
  echo "no program arguments were passed"
else:
  for arg in args:
    echo arg.toUpperAscii()
`,

			'A runtime error, to see how it is reported': `proc divide(a, b: int): int = a div b

echo "about to divide by zero"
echo divide(10, 0)
echo "unreachable"
`
		}
	},

	nim: {
		label: 'Nim (JavaScript)',
		description: 'Compiled to JavaScript and run in a sandboxed frame. Can reach the page.',
		samples: {
			'Hello, factorial, and a sorted seq': SHARED,

			'Calling into JavaScript': `# The JavaScript backend compiles to JavaScript, so a program can call into it directly - this is
# the JS backend's answer to \`importc\`. It also runs in a real document, which the WebAssembly
# backend has no access to.
proc setBody(html: cstring) {.importjs: "document.body.innerHTML = #".}
proc bodyHtmlAfter(prefix: cstring): cstring {.importjs: "# + document.body.innerHTML".}
proc toJson(value: cstring): cstring {.importjs: "JSON.stringify(#)".}

setBody("<p>Written by Nim, rendered by the browser</p>")
# \`importjs\` substitutes its arguments into the pattern, so a reader has to take one even when it has
# nothing to add - hence the empty prefix.
echo "the frame's body now holds: ", bodyHtmlAfter("")
echo "and JSON.stringify, from Nim: ", toJson("hello")
`,

			'A runtime error, to see how it is reported': `proc divide(a, b: int): int = a div b

echo "about to divide by zero"
echo divide(10, 0)
echo "unreachable"
`
		}
	}
});

export const DEFAULT_LANGUAGE = 'nim-wasm';

export const samplesFor = (language) => LANGUAGES[language].samples;
