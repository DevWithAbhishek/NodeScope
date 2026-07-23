## Initialize express app

```cmd
npm init -y

npm i express

npm i --save-dev @types/express
```
---
## Typescript setup

- npm install -D typescript tsx @types/node
    - typescript → compiles/type-checks TypeScript.
    - tsx → runs .ts files directly during development and supports watch mode cleanly.
    - @types/node → gives TypeScript definitions for Node APIs such as process, Buffer, node:http, etc.

- ***tsx*** is a development tool that allows us to conveniently execute TypeScript.

---
## Running the Server

- **npm run dev**: Run my TypeScript application in a developer-friendly way and automatically react to source-code changes.

- **npm run build**: only prepares the executable JavaScript. 

- ***"tsx"*** solves a development problem: "Make coding TypeScript convenient."  
Whereas ***"tsc"*** solves a build problem: "Produce the JavaScript artifact that I intend to run/deploy."

- **npm start**: runs the built application.

- Mental Model:
    ```typescript
            SOURCE CODE
            app.ts + server.ts
                │
                │
                ├──────── DEVELOPMENT ────────┐
                │                             │
                │                      npm run dev
                │                             │
                │                      tsx watch
                │                             │
                │                       RUN + RELOAD
                │
                │
                └──────── PRODUCTION ─────────┐
                                                │
                                        npm run build
                                                │
                                            tsc
                                                │
                                                ▼
                                        dist/*.js
                                                │
                                        npm start
                                                │
                                                ▼
                                            node
                                                │
                                                ▼
                                        RUN PRODUCTION
  ```

---

```javascript
    lib: ["ES2022"]
        ↓
    "What STANDARD JAVASCRIPT APIs exist?"


    types: ["node"]
        ↓
    "What ENVIRONMENT/PLATFORM-specific types
    should be globally available?"
```

---

---