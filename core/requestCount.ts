import myEvents from "./eventBus.js";

let requestCount = 0;

myEvents.on('request:completed', () => {
    requestCount++;
})

export default function getRequestCount() {
    return requestCount;
}