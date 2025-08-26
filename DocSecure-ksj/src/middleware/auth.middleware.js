const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require('../utils/logger');

const authMiddleware = {
  protect: async (req, res, next) => {
    try {
      let token;
      
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'You are not logged in. Please log in to get access.'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'The user belonging to this token does no longer exist.'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid token. Please log in again.'
        });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          message: 'Your token has expired. Please log in again.'
        });
      }
      next(error);
    }
  },

  restrictTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'error',
          message: 'You do not have permission to perform this action.'
        });
      }
      next();
    };
  }
};

module.exports = authMiddleware;
