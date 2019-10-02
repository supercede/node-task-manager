const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user._id
    });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//With Pagination, sorting and limiting 
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if(req.query.completed){
    match.completed = req.query.completed === 'true';
  }

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':');
    const field = parts[0];
    const param = parts[1];
    let val = param === 'asc' ? 1 : -1;
    sort[field] = val;
  }
  try {
    const user = req.user;
    await user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
    res.send(user.tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, user: req.user._id });
    return !task ? res.status(404).send("Task not found") : res.send(task);
  } catch (err) {
    res.status(406).send("Please enter a valid id");
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedParams = ["description", "completed"];
  const givenParams = Object.keys(req.body);
  let isAllowed = givenParams.every(param => allowedParams.includes(param));

  if (!isAllowed) {
    return res
      .status(400)
      .send("Invalid, Valid fields are: description or completed");
  }
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, user: req.user._id });

    if (!task) {
      return res.status(404).send("Task not found");
    }

    givenParams.forEach(param => (task[param] = req.body[param]));
    await task.save();
    return res.send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, user: req.user._id });
    return !task
      ? res.status(404).send("Task not Found")
      : res.status(202).send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
