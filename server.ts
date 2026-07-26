import app from "./app.js";
import myEvents from "./core/eventBus.js";
import { addLog } from "./core/logStore.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

myEvents.on("request:completed", (data) => {
    addLog({
        timestamp: new Date().toISOString(),
        method: data.method,
        url: data.url,
        statusCode: data.statusCode,
        durationMs: data.durationMs,
        level: data.statusCode >= 500 ? 'error'
            : data.statusCode >= 400 ? 'warn'
                : 'info'
    });
    console.log("Log added");
});

process.on('SIGINT', () => {
    console.log("SIGINT received, shutting down gracefully...");

    server.close(() => {
        // fires once all in-flight HTTP requests have finished responding
        console.log("HTTP server closed.");
        process.exit(0);
    })

    // safety net: if some connection never finishes (hung request), force exit
    setTimeout(() => {
        console.error("Forcing shutdown after timeout.");
        process.exit(1);
    }, 10_000).unref();
})