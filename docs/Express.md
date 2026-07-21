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
## app.ts vs server.ts

- **app.ts** only answers: "What is my HTTP application, and how should it process requests?"

- It configures:
  ```typescript
                Express instance
                    │
                    ├── Middleware
                    │     ├── JSON parsing
                    │     ├── CORS
                    │     ├── Logging
                    │     └── Authentication
                    │
                    ├── Routes
                    │     ├── /users
                    │     ├── /orders
                    │     └── /incidents
                    │
                    └── Error handling
  ```

- **server.ts**: "Start this application and make it available to the outside world." Typically it looks like:
    ```typescript
    import app from "./app";

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    ```

- server.ts owns the process lifecycle:
  ```typescript
                Process starts
                      ↓
                Load configuration
                      ↓
                Connect database
                      ↓
                Connect Redis / queues
                      ↓
                Start HTTP listener
                      ↓
                Application serves traffic
                      ↓
                Shutdown signal received
                      ↓
                Stop accepting requests
                      ↓
                Close dependencies
                      ↓
                Process exits
  ```

- The problem of using one file appears when we want to use the Express application without starting a real server, eg. Testing. 

- Startup looks approximately like:
  ```typescript
                      server.ts
                        │
                        │ imports
                        ▼
                      app.ts
                        │
                        ├── create Express app
                        ├── register middleware
                        ├── register routes
                        └── export app
                        │
                        ▼
                      server.ts receives app
                        │
                        ▼
                      app.listen(PORT)
                        │
                        ▼
                      HTTP server begins listening
  ```

- Then a request arrives:
  ```typescript
                      Client
                        │
                        │ GET /api/incidents
                        ▼
                      Port 3000
                        │
                        ▼
                      HTTP Server
                        │
                        ▼
                      Express app
                        │
                        ├── middleware
                        ▼
                      router
                        ▼
                      controller
                        ▼
                      service
                        ▼
                      database
                        │
                        ▼
                      response
  ```

- server.ts is mainly important during startup and shutdown. It does not normally contain your request-processing logic.  
Once the server is running, requests are handled by the application configured in app.ts.

- Responsibilities:
  ```typescript
      app.ts
      ────────────────────
      HTTP behavior

      Middleware
      Routes
      Error handlers
      Request processing


      server.ts
      ────────────────────
      Runtime lifecycle

      Environment/config
      DB connection
      Redis connection
      Start listening
      Graceful shutdown
      Process signals
  ```

- Example:
  ```typescript
      server.ts
        │
        ├── initialize PostgreSQL
        ├── initialize Redis
        ├── initialize observability
        ├── start HTTP server
        └── graceful shutdown
                  ↓
      app.ts
        │
        ├── security middleware
        ├── authentication
        ├── incident routes
        ├── SLA routes
        ├── admin routes
        └── error handling
  ```

- app.ts = APPLICATION CONSTRUCTION   
         = "What does my HTTP application do?"

- server.ts = APPLICATION BOOTSTRAP / RUNTIME  
            = "How does this process initialize, start,
listen, and eventually shut down?"

- Mental Model:
  ```typescript
                          app.ts
                            │
                  Configure application
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
          Middleware      Routes    Error handling
                            │
                            ▼
                      export app
                            │
                            ▼
                        server.ts
                            │
                  Initialize runtime
                            │
                DB / Redis / Config
                            │
                            ▼
                      app.listen(PORT)
                            │
                            ▼
                      Accept traffic
  ```

---

---