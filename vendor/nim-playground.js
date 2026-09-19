// packages/nim-wasm/src/js-runtime.js
var BOOTSTRAP = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(function () {
  var SOURCE = 'nim-playground';
  var send = function (kind, text) {
    parent.postMessage({ source: SOURCE, kind: kind, text: text }, '*');
  };
  var format = function (values) {
    return Array.prototype.map
      .call(values, function (value) {
        if (typeof value === 'string') return value;
        try {
          return JSON.stringify(value);
        } catch (error) {
          return String(value);
        }
      })
      .join(' ');
  };

  // Nim's runtime writes to stdout through console.log and to stderr through console.error, so these
  // are the two that matter; the rest are routed to stderr so nothing is silently lost.
  console.log = function () { send('out', format(arguments)); };
  console.info = console.log;
  console.debug = console.log;
  console.warn = function () { send('err', format(arguments)); };
  console.error = function () { send('err', format(arguments)); };

  window.onerror = function (message, source, line) {
    send('err', String(message) + ' (line ' + line + ')');
    return true;
  };

  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.source !== SOURCE || data.kind !== 'run') return;
    try {
      var script = document.createElement('script');
      // Appending the element is what runs it, and it runs synchronously, so the program has finished
      // by the time the next line reports it.
      script.textContent = data.text;
      document.body.appendChild(script);
    } catch (error) {
      send('err', 'Error: ' + (error && error.message ? error.message : error));
    }
    send('done', '');
  });

  send('ready', '');
})();
<\/script>
</body>
</html>
`;
var SOURCE = "nim-playground";
function executeJavaScript(js, { timeoutMs = 15e3, onStdout = () => {
}, onStderr = () => {
} } = {}) {
  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("title", "Nim program output");
    frame.style.display = "none";
    frame.srcdoc = BOOTSTRAP;
    const stdout = [];
    const stderr = [];
    const order = [];
    let settled = false;
    const finish = (failed) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      frame.remove();
      resolve({
        stdout: stdout.join("\n"),
        stderr: stderr.join("\n"),
        output: order.join("\n"),
        failed
      });
    };
    const timer = setTimeout(() => {
      stderr.push(`Timed out after ${timeoutMs}ms waiting for the program to finish.`);
      order.push(`Timed out after ${timeoutMs}ms waiting for the program to finish.`);
      finish(true);
    }, timeoutMs);
    const onMessage = (event) => {
      const data = event.data;
      if (!data || data.source !== SOURCE || event.source !== frame.contentWindow) return;
      if (data.kind === "ready") {
        frame.contentWindow.postMessage({ source: SOURCE, kind: "run", text: js }, "*");
        return;
      }
      if (data.kind === "out") {
        stdout.push(data.text);
        order.push(data.text);
        onStdout(`${data.text}
`);
        return;
      }
      if (data.kind === "err") {
        stderr.push(data.text);
        order.push(data.text);
        onStderr(`${data.text}
`);
        return;
      }
      if (data.kind === "done") finish(false);
    };
    window.addEventListener("message", onMessage);
    document.body.appendChild(frame);
  });
}

// src/playground.js
function createPlayground({
  // Where `npm run bundle` writes the worker. Only the bundling convention is assumed; pass a URL to
  // host it somewhere else.
  workerUrl = "./vendor/nim-worker.js",
  nimBaseUrl,
  clangBaseUrl,
  onStatus = () => {
  },
  onCompilerLog = () => {
  },
  onProgress = () => {
  },
  onOutput = () => {
  }
}) {
  const assets = {
    nimBaseUrl: new URL(nimBaseUrl, document.baseURI).href,
    clangBaseUrl: new URL(clangBaseUrl, document.baseURI).href
  };
  let worker = null;
  let pending = null;
  const settle = (result) => {
    const waiting = pending;
    pending = null;
    waiting?.resolve(result);
  };
  const fail = (error) => {
    const waiting = pending;
    settle({
      ok: false,
      phase: "worker",
      target: waiting?.target,
      errors: [String(error?.message ?? error)],
      output: ""
    });
  };
  const onMessage = async ({ data }) => {
    if (!data) return;
    if (data.kind === "status") return onStatus(data.text);
    if (data.kind === "log") return onCompilerLog(data.text);
    if (data.kind === "progress") return onProgress(data.value);
    if (data.kind === "out" || data.kind === "err") return onOutput(data.text, data.kind);
    if (data.kind !== "result") return;
    const result = data.result;
    const waiting = pending;
    if (!waiting) return;
    if (waiting.target === "js") {
      onStatus("running\u2026");
      const runStarted = performance.now();
      const ran = await executeJavaScript(result.compiledCode, {
        onStdout: (text) => onOutput(text, "out"),
        onStderr: (text) => onOutput(text, "err")
      });
      settle({
        ...result,
        phase: "run",
        ok: !ran.failed,
        stdout: ran.stdout,
        stderr: ran.stderr,
        output: ran.output,
        exitCode: ran.failed ? 1 : 0,
        errors: ran.failed && ran.stderr ? [ran.stderr] : [],
        runMs: performance.now() - runStarted,
        totalMs: performance.now() - waiting.started
      });
      return;
    }
    settle(result);
  };
  const ensureWorker = () => {
    if (worker) return worker;
    worker = new Worker(workerUrl);
    worker.onmessage = onMessage;
    worker.onerror = (event) => fail(new Error(event.message || "The worker failed to start."));
    return worker;
  };
  return {
    /** `target` is one of `@live-codes/nim-wasm`'s, e.g. `wasm` or `js`. */
    async run(source, { target, args = [], stdin = "" } = {}) {
      if (pending) throw new Error("A run is already in progress.");
      const started = performance.now();
      return new Promise((resolve) => {
        pending = { resolve, target, started };
        ensureWorker().postMessage({ type: "run", source, target, args, stdin, ...assets });
      });
    },
    /**
     * Give up on the current run.
     *
     * Terminating is the only way to stop a build that is stuck, and it costs the warm state: the
     * next run reloads both toolchains. That is the trade for having a way out at all.
     */
    stop() {
      worker?.terminate();
      worker = null;
      const waiting = pending;
      if (!waiting) return;
      settle({
        ok: false,
        phase: "stopped",
        target: waiting.target,
        errors: ["Stopped."],
        output: "",
        totalMs: performance.now() - waiting.started
      });
    }
  };
}

// src/samples.js
var SHARED = `import strformat, algorithm

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
var LANGUAGES = Object.freeze({
  "nim-wasm": {
    label: "Nim (WebAssembly)",
    // Which target of `@live-codes/nim-wasm` this language is. The ids differ on purpose: the package
    // names a backend, and the page names a language to offer.
    target: "wasm",
    description: "Compiled to C, then to WebAssembly with the Clang toolchain. Real Nim semantics.",
    samples: {
      "Hello, factorial, and a sorted seq": SHARED,
      "Primes with a set and a proc": `import strutils, sequtils

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
      "Reading a command-line argument": `import os, strutils

let args = commandLineParams()
if args.len == 0:
  echo "no program arguments were passed"
else:
  for arg in args:
    echo arg.toUpperAscii()
`,
      "A runtime error, to see how it is reported": `proc divide(a, b: int): int = a div b

echo "about to divide by zero"
echo divide(10, 0)
echo "unreachable"
`
    }
  },
  nim: {
    label: "Nim (JavaScript)",
    target: "js",
    description: "Compiled to JavaScript and run in a sandboxed frame. Can reach the page.",
    samples: {
      "Hello, factorial, and a sorted seq": SHARED,
      "Calling into JavaScript": `# The JavaScript backend compiles to JavaScript, so a program can call into it directly - this is
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
      "A runtime error, to see how it is reported": `proc divide(a, b: int): int = a div b

echo "about to divide by zero"
echo divide(10, 0)
echo "unreachable"
`
    }
  }
});
var DEFAULT_LANGUAGE = "nim-wasm";
var samplesFor = (language) => LANGUAGES[language].samples;
export {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  createPlayground,
  samplesFor
};
