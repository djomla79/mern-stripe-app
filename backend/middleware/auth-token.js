const jwt = require('jsonwebtoken');
const config = require('../config/auth-constants');
const HttpError = require('../models/http-error');

const checkAuthToken = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new HttpError('Authentication failed, missing token!');
    }
    const tokenDecoded = jwt.verify(token, config.tokenSecret);
    req.userData = { id: tokenDecoded.id };
    next();
  } catch (err) {
    return next(new HttpError(err, 403));
  }
};

module.exports = checkAuthToken;
