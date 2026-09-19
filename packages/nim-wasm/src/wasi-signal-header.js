// A minimal <signal.h> for the pruned WASI sysroot the Clang runtime ships.
//
// The sysroot has no <signal.h> (and no <setjmp.h>) — it is a wasi-libc prune with the C++ headers
// restored on top. Nim's generated C for the system module does `#include <signal.h>` and then calls
// `signal()` and `raise()` while installing its SIGSEGV/SIGABRT/SIGFPE handlers and re-raising.
//
// WASI has no signals, so these are declarations plus no-op definitions: enough for that code to
// compile and link. The handlers can never fire, and a real trap aborts the wasm instance instead.
//
// Mounted at `include/wasm32-wasi/signal.h`, which is already on the include path the runtime hands
// clang (`clangSystemIncludePaths`), so Nim's own `#include <signal.h>` picks it up with no rewriting
// of the generated C.
export const WASI_SIGNAL_HEADER_PATH = 'include/wasm32-wasi/signal.h';

export const WASI_SIGNAL_HEADER = `/* Minimal <signal.h> supplied by the Nim playground.
   The runtime's WASI sysroot has no signal.h; Nim's system module needs one to compile. WASI has no
   signals, so nothing here ever runs. */
#ifndef NIM_WASI_SIGNAL_SHIM_H
#define NIM_WASI_SIGNAL_SHIM_H

#ifdef __cplusplus
extern "C" {
#endif

typedef int sig_atomic_t;

typedef void (*nim_signal_handler_t)(int);

#ifndef SIG_DFL
#define SIG_DFL ((nim_signal_handler_t)0)
#endif
#ifndef SIG_IGN
#define SIG_IGN ((nim_signal_handler_t)1)
#endif
#ifndef SIG_ERR
#define SIG_ERR ((nim_signal_handler_t)-1)
#endif

#ifndef SIGHUP
#define SIGHUP 1
#endif
#ifndef SIGINT
#define SIGINT 2
#endif
#ifndef SIGQUIT
#define SIGQUIT 3
#endif
#ifndef SIGILL
#define SIGILL 4
#endif
#ifndef SIGTRAP
#define SIGTRAP 5
#endif
#ifndef SIGABRT
#define SIGABRT 6
#endif
#ifndef SIGBUS
#define SIGBUS 7
#endif
#ifndef SIGFPE
#define SIGFPE 8
#endif
#ifndef SIGKILL
#define SIGKILL 9
#endif
#ifndef SIGUSR1
#define SIGUSR1 10
#endif
#ifndef SIGSEGV
#define SIGSEGV 11
#endif
#ifndef SIGUSR2
#define SIGUSR2 12
#endif
#ifndef SIGPIPE
#define SIGPIPE 13
#endif
#ifndef SIGALRM
#define SIGALRM 14
#endif
#ifndef SIGTERM
#define SIGTERM 15
#endif

/* static, so every translation unit gets its own copy and there is no duplicate symbol at link time. */
static __attribute__((unused)) nim_signal_handler_t signal(int signum, nim_signal_handler_t handler) {
	(void)signum;
	(void)handler;
	return SIG_DFL;
}

/* Nim's handler re-raises after restoring the default disposition. Because signal() above never
   actually installs anything, not raising is the correct no-op. */
static __attribute__((unused)) int raise(int signum) {
	(void)signum;
	return 0;
}

#ifdef __cplusplus
}
#endif

#endif
`;
