const jwt = require('jsonwebtoken');

const getToken = async (request, res, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.user = await jwt.verify(authorization.substring(7), process.env.SECRET);
    next();
  }

  next();
};

module.exports = { getToken };
