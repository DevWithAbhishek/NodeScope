import express, { type Express, type Request, type Response } from 'express';
import systemRoute from "./routes/system.routes.js"
import logger from './middlewares/logger.js';
import eventLoop from "./routes/eventLoop.routes.js"
import fileRouter from "./routes/file.routes.js"
import logRouter from "./routes/logs.routes.js"
import stats from "./routes/stats.routes.js"

const app: Express = express();

app.use(express.json());
app.use(express.static("public"));

app.use(logger);

app.use('/system', systemRoute);
app.use("/file", fileRouter);
app.use("/logs", logRouter);
app.use("/stats", stats);

app.use('/', eventLoop);

app.get("/slow", async (req: Request, res: Response) => {
    const durationMs = Number(req.query.ms) || 5000;
    const start = Date.now();
    while (Date.now() - start < durationMs) {
        // slow down
    }
    
    res.send("Slow process done");
});

export default app;