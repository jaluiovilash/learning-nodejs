const { connectMongoDb } = require("./connection")
const express = require("express");

const { logReqRes } = require("./middlewares")
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// CONNECTION
connectMongoDb("mongodb://localhost:27017/my-first-db")

// Middleware to handle URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// ROUTES
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
