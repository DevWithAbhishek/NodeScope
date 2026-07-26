import EventEmitter from "node:events";

const myEvents = new EventEmitter();

myEvents.addListener("request:completed", (data) => {
    console.log("Request completed:", data);
})

export default myEvents;

// myEvents.addListener("hello", () => {
//     console.log("Hello event emitted");
// })

// myEvents.addListener("hello", function myListener() {
//     console.log("Just listen to me");
// })

// myEvents.on("userCreated", (user) => {
//     console.log("Send welcome email:", user.email);
// });

// myEvents.emit("hello");
// myEvents.emit("userCreated", {
//     id: 1,
//     email: "abhishek@example.com"
// });