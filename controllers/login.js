/* eslint-disable no-underscore-dangle */
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'username or password is not correct!!!',
    });
  }
  const token = jwt.sign({
    username,
    id: user._id,
  }, process.env.SECRET);
  return res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
