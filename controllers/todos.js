/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const todosRouter = require('express').Router();
const Todo = require('../models/todo');
const User = require('../models/user');
// Routes
todosRouter.get('/', async (req, res) => {
  const tasks = await Todo.find({}).populate('user', {
    name: 1,
    username: 1,
  });
  res.json(tasks).status(200);
});

todosRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findById(body.userId);
  const task = new Todo({
    user: user._id,
    task: body.task,
    important: body.important,
    completed: body.completed,
  });
  user.tasks = user.tasks.concat(task._id);
  await user.save();
  const savedTask = await task.save();
  res.json(savedTask).status(201);
});

module.exports = todosRouter;
