import express, { type Express, type Request, type Response } from "express";
// import myEvents from "../lib/events.js";

const eventRouter = express.Router();

eventRouter.get("/", (req: Request, res: Response) => {
    const order = ['sync-start']; // 1 - sync definition & declaration

    // Executes later in this observed request.
    // By then res.json() has already serialized the array.
    setTimeout(() => {
        order.push("set-timeout");

        console.log("TIMER EXECUTED");
        console.log(order);
    }, 0);

    Promise.resolve().then(() =>
        order.push('promise 1') // 4 - microtask
    );

    process.nextTick(() => {
        order.push('tick tick 1'); // 3 - microtask with higher priority over promises
    })

    setImmediate(() => order.push('set-immediate')); // 5 - "set-immediate" appears in the JSON precisely because it was pushed before res.json() serialized the array.

    order.push('sync-end'); // 2 - sync push

    setImmediate(() => {
        console.log("SENDING RESPONSE:", order);
        res.json({ executionOrder: order });
    });
});

export default eventRouter;

// eventRouter.get("/emit", (req, res) => {
//     // myEvents.on("request:completed", () => {
//     //     console.log("Event Completed the req-res cycle");
//     // }) // - causes piling up of listeners on each request (subscribe outside for once, publish using .emit() as many times needed )
//     res.send("Events emitted successfully")
// })

