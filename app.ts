import express, { type Express, type Request, type Response } from 'express';
import systemRoute from "./routes/system.routes.js"
import logger from './middlewares/logger.js';

const app: Express = express();

app.use(express.json());
app.use(express.static("public"));

app.use(logger)

app.use('/system', systemRoute);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello NodeScope');
});

export default app;