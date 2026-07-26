import validateQuery from "../middlewares/validateQuery.js";
import express, { type Request, type Response } from "express";
import { getLogs } from "../core/logStore.js"

const router = express.Router();

router.get('/', validateQuery(['error', 'warn', 'info', 'all']), (req: Request, res: Response) => {
    const level = req.query.level || 'all';
    const logs = getLogs();
    const filtered = level === 'all' ? logs : logs.filter(entry => entry.level === level);
    res.json(filtered);
})

export default router;