import { type Request, type Response, type NextFunction } from 'express';
import process from "node:process";

const logger = function (req: Request, res: Response, next: NextFunction) {
    const startedAt = Date.now();
    const startTime = process.hrtime.bigint();

    res.on("finish", () => {
        const endTime = process.hrtime.bigint();
        const duration_ms = Number(endTime - startTime) / 1_000_000;

        console.log({
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            startedAt: new Date(startedAt).toISOString(),
            userAgent: req.get("user-agent"),
            ip: req.ip,
            duration_ms: duration_ms.toFixed(3) + " ms"
        })
    })

    next();
};

export default logger;