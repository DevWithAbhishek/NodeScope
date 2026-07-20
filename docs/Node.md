# Core Concepts (Node.js)

---
## Node.js
Node.js is a JavaScript runtime built on the V8 JavaScript engine.

---
## os.cpus()
Returns an array of objects containing information about each logical CPU core. The array will be empty if no CPU information is available, such as if the /proc file system is unavailable. ([os.cpus()](https://nodejs.org/docs/latest/api/os.html#oscpus))

```javascript
[
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 252020,
      nice: 0,
      sys: 30340,
      idle: 1070356870,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 306960,
      nice: 0,
      sys: 26980,
      idle: 1071569080,
      irq: 0,
    },
  },    
];
```

---

## os.freemem()
 Returns the amount of free system memory in bytes as an integer. ([os.freemem()](https://nodejs.org/docs/latest/api/os.html#osfreemem))

---

## os.availableParallelism()
 Returns an estimate of the default amount (*integer*) of parallelism a program should use. Always returns a value greater than zero.

---
# process.memoryUsage()
Returns an object describing the memory usage of the Node.js process measured in bytes. ([process.memoryUsage()](https://nodejs.org/docs/latest/api/process.html#processmemoryusage))

```javascript
import { memoryUsage } from 'node:process';

console.log(memoryUsage());
// Prints:
// {
//  rss: 4935680,
//  heapTotal: 1826816,
//  heapUsed: 650472,
//  external: 49879,
//  arrayBuffers: 9386
// }
```
---

## process.uptime()
 Returns the number of seconds the current Node.js process has been running. ([process.uptime()](https://nodejs.org/docs/latest/api/process.html#processuptime))

---

## process.env
returns an object containing the user environment. On Windows operating systems, environment variables are case-insensitive.([process.env](https://nodejs.org/docs/latest/api/process.html#processenv))





---