// The programs the page offers.
//
// They live here rather than inside index.html so that the same source the page runs is the source
// the tests run — a broken sample in the picker would otherwise only be found by clicking it.
export const SAMPLES = Object.freeze({
	'Hello, factorial, and a sorted seq': `import strformat, algorithm

let name = "browser"
echo "Hello, ", name, "!"

for i in 0..4:
  echo &"i = {i}"

let xs = @[3, 1, 4, 1, 5, 9, 2, 6]
echo "sorted: ", xs.sorted

proc factorial(n: int): int =
  if n <= 1: 1 else: n * factorial(n-1)
echo "5! = ", factorial(5)
`,

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
});

export const DEFAULT_SAMPLE = Object.keys(SAMPLES)[0];
