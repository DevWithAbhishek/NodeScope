
export default function measureLoopLag(): Promise<number> {
    return new Promise((resolve) => {
        const start = process.hrtime.bigint();

        setImmediate(() => {
            const end = process.hrtime.bigint();
            const lagMs = Number(end - start) / 1_000_000;
            resolve(lagMs);
        })
    })
}