# Express.js

---
## Routing
Routing refers to how an application’s endpoints (URIs) respond to client requests.  
It refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

```typescript
app.METHOD(PATH, HANDLER);
```
Where:
- app is an instance of express.
- METHOD is an HTTP request method, in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.

```typescript
import { type Request, type Response } from 'express';

// Respond with Hello World! on the homepage
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/', (req: Request, res: Response) => {
  res.send('Got a POST request');
});

app.put('/user', (req: Request, res: Response) => {
  res.send('Got a PUT request at /user');
});

app.delete('/user', (req: Request, res: Response) => {
  res.send('Got a DELETE request at /user');
});

```
- To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.  
The function signature is:

    ```typescript
    // express.static(root, [options]);
    app.use(express.static('public'));

    ```

---
## res.json()
Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().

The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and we can also use it to convert other values to JSON.

```typescript
res.json(null);
res.json({ user: 'tobi' });
res.status(500).json({ error: 'message' });
```

---