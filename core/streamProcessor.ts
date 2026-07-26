import { Transform, TransformCallback, TransformOptions } from "node:stream";

export class LineWordCounter extends Transform {
    wordCount: number;
    lineCount: number;

    constructor(options?: TransformOptions) {
        super(options);
        this.lineCount = 0;
        this.wordCount = 0;
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        const text = chunk.toString();
        this.lineCount += (text.match(/\n/g) || []).length;
        this.wordCount += (text.trim().split(/\s+/).filter(Boolean)).length;
        this.push(chunk);
        callback();
    }

    _flush(callback: TransformCallback) {
        callback();
    }
}