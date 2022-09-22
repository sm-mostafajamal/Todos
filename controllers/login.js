const loginRouter = require('express').Router();
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordHash = await bycript.compare(password, user.password);
  if (!passwordHash) {
    return res.status(401).json({
      error: 'username or password is not correct!!!',
    });
  }
  // const userToken = await jwt.sign({
  //   username,
  //   id: user._id
  // });
  // console.log(userToken)
});

module.exports = loginRouter;
