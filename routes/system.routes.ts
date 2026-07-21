import express from "express";
import os from 'node:os';
import process from "node:process";

const router = express.Router();

//home page
router.get("/", (req, res) => {
    console.log("Hello - Welcome to the System");
    res.send("Bye Bye");
})

// Returns an array of objects containing information about each logical CPU core.
router.get("/cpus", (req, res) => {
    res.json(os.cpus());
})
 
// Returns the amount of free system memory in bytes as an integer.
router.get("/freemem", (req, res) => {
    res.send(os.freemem());
})

// Returns the total amount of system memory in bytes as an integer.
router.get("/memoryUsage", (req, res) => {
    res.send(process.memoryUsage());
})

// Returns the system uptime in seconds as a number.
router.get("/uptime", (req, res) => {
    res.send(process.uptime());
})

// Returns an object containing the user environment.
router.get("/env", (req, res) => {
    res.json(process.env);
})

export default router;