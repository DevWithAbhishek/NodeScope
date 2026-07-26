// core/logStore.js

export interface log {
    timestamp: string,
    method: string,
    url: string,
    statusCode: number,
    durationMs: number,
    level: 'error' | 'warn' | 'info' | 'all'
}

const MAX_LOGS = 500;
const logStore: log[] = [];

export function addLog(entry: log) {
    logStore.push(entry);
    if (logStore.length > MAX_LOGS) {
        logStore.shift(); // drop oldest — keep memory bounded
    }
}

export function getLogs() {
    return logStore;
}
