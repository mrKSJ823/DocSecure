const authService = require('../services/auth.service');
const logger = require('../utils/logger');

const authController = {
  register: async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const result = await authService.register({ email, password, name });
      
      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      // In a real application, you might want to invalidate the token
      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
