const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const title = (req.body?.title || "").trim();
  if (!title) return res.status(400).json({ message: "Title is required" });

  const task = await Task.create({ title });
  res.status(201).json(task);
});

router.put("/:id", async (req, res) => {
  const updates = {};
  if (typeof req.body.title === "string") {
    const t = req.body.title.trim();
    if (!t) return res.status(400).json({ message: "Title cannot be empty" });
    updates.title = t;
  }
  if (typeof req.body.completed === "boolean") updates.completed = req.body.completed;

  const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Deleted" });
});

module.exports = router;
