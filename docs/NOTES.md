Add a /slow route that blocks the event loop with a sync loop, then measure lag via milestone 6's timing to feel blocking vs non-blocking
Implement a tiny custom body-parser middleware (parse application/json manually from stream chunks) to understand what express.json() actually does
Add process.nextTick starvation demo (recursive nextTick blocking I/O) to see microtask queue starvation
Track active EventEmitter listener count and expose it via /stats (memory leak awareness)
Add a rate-limiter as custom middleware using a Map + timestamps (no external lib) — teaches middleware state + closures