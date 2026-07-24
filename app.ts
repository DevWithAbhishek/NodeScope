import express, { type Express, type Request, type Response } from 'express';
import systemRoute from "./routes/system.routes.js"
import logger from './middlewares/logger.js';
import eventLoop from "./routes/eventLoop.routes.js"
import fileRouter from "./routes/file.routes.js"

const app: Express = express();

app.use(express.json());
app.use(express.static("public"));

app.use(logger);

app.use('/system', systemRoute);
app.use("/file", fileRouter);

app.use('/', eventLoop);

export default app;