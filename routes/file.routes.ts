import express, { type Express, type Request, type Response, type Router, type NextFunction } from "express";
import {pipeline} from "node:stream";
import fs from "fs";
import path from "path";
import { bytes } from "node:stream/consumers";

interface Filename {
    name: string
}

const router: Router = express.Router();
const Upload_Dir = path.join(import.meta.dirname, '..', 'uploads');

// Route 1: params demo
router.get('/:name', (req: Request<Filename>, res: Response) => {
    const safeName = path.basename(req.params.name);
    res.json({ requestedFile: safeName });
})

// Route 2: raw stream upload 
// Postman : set Header with filename & body type to binary (select file for upload)
router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
    const rawName = req.get("x-filename") ?? "unnamed.txt";
    const safeName = path.basename(rawName);
    const filePath = path.join(Upload_Dir, safeName);
    const writeStream = fs.createWriteStream(filePath);

    let responded = false;
    const respondOnce = (fn: () => void) => {
        if (!responded) {
            responded = true;
            fn();
        }
    };

    req.pipe(writeStream); // Read chunks from the incoming HTTP request body and write them into writeStream i.e. coordinates readable and writable streams.
    writeStream.on('finish', () => respondOnce(() => {
        res.json({ saved: safeName, bytes: writeStream.bytesWritten })
    }));
    req.on('error', (err) => respondOnce(() => next(err)));// Subscribe to the "error" event emitted by this incoming request stream.
    writeStream.on('error', (err) => respondOnce(() => next(err)));

});

export default router;