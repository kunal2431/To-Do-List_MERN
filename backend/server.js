const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const tasksRouter = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("OK"));
app.use("/tasks", tasksRouter);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`Backend running on ${port}`));
  })
  .catch((e) => {
    console.error("MongoDB connection failed:", e.message);
    process.exit(1);
  });
