// Running the JavaScript the `js` backend emits.
//
// This is an iframe rather than an `eval` or a worker, and the reason is what `nim js` is for: it
// targets the browser, and Nim's own `lib/js` modules drive the DOM and `fetch`, so a program needs a
// document before it can do anything worth doing. `sandbox="allow-scripts"` is what makes that safe —
// with no `allow-same-origin` the frame gets an opaque origin, so the program cannot reach this page,
// its storage, or these globals.
//
// The program is handed over as a message rather than interpolated into the markup, so nothing in it
// has to survive being embedded in HTML — a string containing `</script>` is not a special case here.
//
// A program that loops forever will hang the tab: it shares the page's event loop, and the timeout
// below cannot fire while the thread is busy. Killing a runaway program needs a worker, which is the
// same trade the browser makes for any inline script.
const BOOTSTRAP = `<!DOCTYPE html>
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
</script>
</body>
</html>
`;

const SOURCE = 'nim-playground';

/**
 * Run compiled Nim JavaScript in a sandboxed frame and collect what it prints.
 *
 * Each console call becomes one line, which is how the browser's own console would show them. The JS
 * backend routes both `echo` and `stdout.write` through console, so a program that writes without a
 * newline gains one here — a limit of the backend's mapping to JavaScript, not of this runner.
 *
 * @param {string} js - the program, as `nim js` emitted it.
 * @param {object} [options]
 * @param {number} [options.timeoutMs] - how long to wait for the program to report that it finished.
 * @param {(text: string) => void} [options.onStdout] - each line as it arrives, newline included, so
 *   that concatenating them reproduces `stdout` exactly.
 * @param {(text: string) => void} [options.onStderr] - the same for stderr.
 * @returns {Promise<{stdout: string, stderr: string, output: string, failed: boolean}>}
 */
export function executeJavaScript(js, { timeoutMs = 15000, onStdout = () => {}, onStderr = () => {} } = {}) {
	return new Promise((resolve) => {
		const frame = document.createElement('iframe');
		frame.setAttribute('sandbox', 'allow-scripts');
		frame.setAttribute('title', 'Nim program output');
		frame.style.display = 'none';
		frame.srcdoc = BOOTSTRAP;

		const stdout = [];
		const stderr = [];
		const order = [];
		let settled = false;

		const finish = (failed) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			window.removeEventListener('message', onMessage);
			// The frame holds the program's globals; dropping it is what discards them.
			frame.remove();
			resolve({
				stdout: stdout.join('\n'),
				stderr: stderr.join('\n'),
				output: order.join('\n'),
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
			// The frame's origin is opaque, so its messages arrive as `origin: "null"` and cannot be
			// told apart by origin alone. The source tag separates them from anything else on the page,
			// and the window check keeps them to this frame. The payload is only ever displayed.
			if (!data || data.source !== SOURCE || event.source !== frame.contentWindow) return;

			if (data.kind === 'ready') {
				frame.contentWindow.postMessage({ source: SOURCE, kind: 'run', text: js }, '*');
				return;
			}
			if (data.kind === 'out') {
				stdout.push(data.text);
				order.push(data.text);
				onStdout(`${data.text}\n`);
				return;
			}
			if (data.kind === 'err') {
				stderr.push(data.text);
				order.push(data.text);
				onStderr(`${data.text}\n`);
				return;
			}
			if (data.kind === 'done') finish(false);
		};

		window.addEventListener('message', onMessage);
		document.body.appendChild(frame);
	});
}
