import express, { type Express, type Request, type Response } from 'express';
import systemRoute from "./routes/system.routes.js"

const app: Express = express();

app.use(express.json());
app.use(express.static("public"))

app.use('/system', systemRoute);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
});

export default app;