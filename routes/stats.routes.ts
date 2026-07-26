import express, { type Request, type Response, type Router } from "express";
import { getLogs } from "../core/logStore.js";
import os from "node:os"
import getRequestCount from "../core/requestCount.js";
import measureLoopLag from "../core/eventLoopLag.js";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const logCount = getLogs().length;
    const memory = process.memoryUsage();
    const uptime = process.uptime();
    const cpuLoad = os.loadavg();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const requestCnt = getRequestCount();
    const lagMs = await measureLoopLag();
            

    res.json({ 
        uptimeSeconds: uptime,
        memory: {
            rss: memory.rss,
            heapUsed: memory.heapUsed,
            heapTotal: memory.heapTotal
        },
        cpuLoadAvg: cpuLoad,
        freeMemory: freeMem,
        totalMemory: totalMem,
        requestCount: requestCnt,
        recentLogCount: logCount,
        eventLoopLagMs: lagMs,
    })
})

export default router;