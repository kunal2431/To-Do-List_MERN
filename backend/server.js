const express = require("express");
const cors = require("cors");

const tasksRouter = require("./routes/tasks");

const app = express();

const allowed = [
  "http://localhost:5173",
  "https://to-do-list-mern-pink.vercel.app"
];

app.use(
  cors({
    origin: allowed,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false
  })
);

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => res.send("OK"));
app.use("/tasks", tasksRouter);

module.exports = app;
