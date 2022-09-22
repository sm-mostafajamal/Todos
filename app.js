const express = require('express');
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger');
const todosRouter = require('./controllers/todos');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');

const app = express();

// Database
info('connecting to Database', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected');
  })
  .catch((err) => error(err));

// Middleware
app.use(express.json());
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
