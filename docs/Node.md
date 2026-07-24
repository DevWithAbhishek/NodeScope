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
- returns an object containing the user environment. On Windows operating systems, environment variables are case-insensitive.([process.env](https://nodejs.org/docs/latest/api/process.html#processenv))

- Mental model 🧠
```typescript
Date.now()
= 🕐 CLOCK ON THE WALL

"What time did the request arrive?"


process.hrtime.bigint()
= ⏱️ STOPWATCH

"How long did the request take?"
```

- And for req: **JavaScript** allows us to add a custom property to req; TypeScript rejects it unless the Request type also declares that property.

---
## emitter.on(eventName, listener)

- Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added.
  ```javascript
  import { EventEmitter } from 'node:events';
  const myEE = new EventEmitter();
  myEE.on('foo', () => console.log('a'));
  myEE.prependListener('foo', () => console.log('b'));
  myEE.emit('foo');
  // Prints:
  //   b
  //   a
  ```

---
## emitter.prependListener(eventName, listener)
- Adds the listener function to the beginning of the listeners array for the event named eventName. 
- No checks are made to see if the listener has already been added. 
- Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

---
## emitter.emit(eventName[, ...args])
- Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
- Returns true if the event had listeners, false otherwise.


  ```javascript
  import { EventEmitter } from 'node:events';
  const myEmitter = new EventEmitter();

  // First listener
  myEmitter.on('event', function firstListener() {
    console.log('Helloooo! first listener');
  });
  // Second listener
  myEmitter.on('event', function secondListener(arg1, arg2) {
    console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
  });
  // Third listener
  myEmitter.on('event', function thirdListener(...args) {
    const parameters = args.join(', ');
    console.log(`event with parameters ${parameters} in third listener`);
  });

  console.log(myEmitter.listeners('event'));

  myEmitter.emit('event', 1, 2, 3, 4, 5);

  // Prints:
  // [
  //   [Function: firstListener],
  //   [Function: secondListener],
  //   [Function: thirdListener]
  // ]
  // Helloooo! first listener
  // event with parameters 1, 2 in second listener
  // event with parameters 1, 2, 3, 4, 5 in third listener


  emitter
  =
  an in-process event hub

  Components can:

  .on(...)
  → "Tell me when X happens."

  .emit(...)
  → "X just happened."

  ```

---
## emitter.listeners(eventName)

- Returns a copy of the array of listeners for the event named eventName.

---
## setTimeout(callback[, delay[, ...args]])

- Sets a timer which executes a function or specified piece of code once the timer expires. ([setTimeout()](https://nodejs.org/docs/latest/api/timers.html#timersettimeoutcallback-delay-args))

- In other words, schedules execution of a one-time callback after delay milliseconds.

---
## setImmediate(callback[, ...args])
- Schedules the immediate execution of callback after I/O events' callbacks and before setTimeout and setInterval. ([setImmediate()](https://nodejs.org/docs/latest/api/timers.html#timersetimmediatecallback-args))

- When multiple calls to setImmediate() are made, the callback functions are queued for execution in the order in which they are created. The entire callback queue is processed every event loop iteration. If an immediate timer is queued from inside an executing callback, that timer will not be triggered until the next event loop iteration.

- Schedule this callback for the event loop's check phase.

---
## setInterval(callback[, delay[, ...args]])

- Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call. ([setInterval()](https://nodejs.org/docs/latest/api/timers.html#timersetintervalcallback-delay-args))

---
## process.nextTick(callback[, ...args])

- Adds callback to the "next tick queue". This queue is fully drained after the current operation on the JavaScript stack runs to completion and before the event loop is allowed to continue. ([process.nextTick()](https://nodejs.org/docs/latest/api/process.html#processnexttickcallback-args))

- It's possible to create an infinite loop if one were to recursively call process.nextTick().

---
## Promises ([Read more @Nodejs](https://nodejs.org/learn/asynchronous-work/discover-promises-in-nodejs))

- A Promise is an object representing the eventual completion or failure of an asynchronous operation. ([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise))

- A Promise is a special object in JavaScript that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Essentially, a Promise is a placeholder for a value that is not yet available but will be in the future.

- A Promise can be in one of three states:

  - Pending: The initial state, where the asynchronous operation is still running.
  - Fulfilled: The operation completed successfully, and the Promise is now resolved with a value.
  - Rejected: The operation failed, and the Promise is settled with a reason (usually an error).

  ```javascript
    const myPromise = new Promise((resolve, reject) => {
      const success = true;

      if (success) {
        resolve('Operation was successful!');
      } else {
        reject('Something went wrong.');
      }
    });
  ```

  ```javascript
  const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve('Operation was successful!');
  } else {
    reject('Something went wrong.');
  }
  });

  myPromise
    .then(result => {
      console.log(result); // This will run if the Promise is fulfilled
    })
    .catch(error => {
      console.error(error); // This will run if the Promise is rejected
    })
    .finally(() => {
      console.log('The promise has completed'); // This will run when the Promise is settled
    });
  ```

---
## Promise.reject() and Promise.resolve()

- Promise.reject(reason) returns a Promise object that is rejected with the given reason. It is equivalent to creating a new Promise and immediately calling reject(reason) inside its executor function.

- These methods create a rejected or resolved Promise directly.

  ```javascript
  Promise.resolve('Resolved immediately').then(result => {
    console.log(result); // 'Resolved immediately'
  });
  ```
---
## Buffer
- Buffer objects are used to represent a fixed-length sequence of bytes. The Buffer class is a subclass of JavaScript's <Uint8Array> class and extends it with methods that cover additional use cases.

  ``` javascript
  import { Buffer } from 'node:buffer';

  // Creates a zero-filled Buffer of length 10.
  const buf1 = Buffer.alloc(10);

  // Creates a Buffer of length 10,
  // filled with bytes which all have the value `1`.
  const buf2 = Buffer.alloc(10, 1);

  // Creates an uninitialized buffer of length 10.
  // This is faster than calling Buffer.alloc() but the returned
  // Buffer instance might contain old data that needs to be
  // overwritten using fill(), write(), or other functions that fill the Buffer's
  // contents.
  const buf3 = Buffer.allocUnsafe(10);

  // Creates a Buffer containing the bytes [1, 2, 3].
  const buf4 = Buffer.from([1, 2, 3]);

  // Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
  // are all truncated using `(value & 255)` to fit into the range 0–255.
  const buf5 = Buffer.from([257, 257.5, -255, '1']);

  // Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':
  // [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)
  // [116, 195, 169, 115, 116] (in decimal notation)
  const buf6 = Buffer.from('tést');

  // Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
  const buf7 = Buffer.from('tést', 'latin1');
  ```

### Buffer.concat(list[, totalLength])
  - Concatenates a list of Buffer objects into one Buffer. ([Buffer.concat()](https://nodejs.org/docs/latest/api/buffer.html#bufferconcatlist-totallength))

    ```javascript
    import { Buffer } from 'node:buffer';

    // Create a single `Buffer` from a list of three `Buffer` instances.

    const buf1 = Buffer.alloc(10);
    const buf2 = Buffer.alloc(14);
    const buf3 = Buffer.alloc(18);
    const totalLength = buf1.length + buf2.length + buf3.length;

    console.log(totalLength);
    // Prints: 42

    const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

    console.log(bufA);
    // Prints: <Buffer 00 00 00 00 ...>
    console.log(bufA.length);
    // Prints: 42
    ```
---
## File system

- The node:fs module enables interacting with the file system in a way modeled on standard POSIX (Portable Operating System Interface) functions.

- To use the promise-based APIs: ***"import * as fs from 'node:fs/promises';"***
- Promise-based operations return a promise that is fulfilled when the asynchronous operation is complete.

- To use the callback and sync APIs: ***"import * as fs from 'node:fs';"***

- The callback form takes a completion callback function as its last argument and invokes the operation asynchronously.  
The arguments passed to the completion callback depend on the method, but the first argument is always reserved for an exception.  
If the operation is completed successfully, then the first argument is null or undefined.

### filehandle.createWriteStream([options])

- Creates a writable stream to the file referenced by the filehandle. ([filehandle.createWriteStream()](https://nodejs.org/docs/latest/api/fs.html#filehandlecreatewritestreamoptions))

---
## Stream

- A **stream** is an abstract interface for working with streaming data in Node.js.

- There are many stream objects provided by Node.js. For example, a request to an HTTP server and process.stdout are both stream instances.

- Streams can be readable, writable, or both. All streams are instances of EventEmitter.

- There are four fundamental stream types within Node.js:
  - **Writable**: streams to which data can be written (for example, fs.createWriteStream()).
  - **Readable**: streams from which data can be read (for example, fs.createReadStream()).
  - **Duplex**: streams that are both Readable and Writable (for example, net.Socket).
  - **Transform**: Duplex streams that can modify or transform the data as it is written and read (for example, zlib.createDeflate()).

### Event: 'data'
- Emitted when there is data available to be read from the stream. The listener callback function is passed a chunk of data as its first argument.

### Event: 'error'
- Emitted if there is an error receiving data. The listener callback function is passed an Error object as its first argument.

### Event: 'end'
- Emitted when there is no more data to be consumed from the stream. The listener callback function is not passed any arguments.

---
## Path

- The node:path module provides utilities for working with file and directory paths.

### path.basename(path[, suffix])

-  returns the last portion of a path, similar to the Unix basename command.

    ```javascript
    path.basename('/foo/bar/baz/asdf/quux.html');
    // Returns: 'quux.html'

    path.basename('/foo/bar/baz/asdf/quux.html', '.html');
    // Returns: 'quux'
    ```

### path.dirname(path)

- returns the directory name of a path, similar to the Unix dirname command. Trailing directory separators are ignored.

    ```javascript
    path.dirname('/foo/bar/baz/asdf/quux');
    // Returns: '/foo/bar/baz/asdf'
    ```

### path.extname(path)
- returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. 

- If there is no . in the last portion of the path, or if there are no . characters other than the first character of the basename of path, an empty string is returned.
---