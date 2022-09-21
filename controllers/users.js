/* eslint-disable prefer-destructuring */
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { error } = require('../utils/logger');
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('tasks', {
    task: 1,
    important: 1,
    completed: 1,
  });
  res.json(users).status(200);
});

usersRouter.post('/', async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({
        error: 'please choose unique username',
      });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    return res.json(savedUser).status(201);
  } catch (err) {
    return error(err);
  }
});

module.exports = usersRouter;
