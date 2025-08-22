const userService = require('../services/user.service');
const logger = require('../utils/logger');

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await userService.getAllUsers({ page, limit });
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      res.status(200).json({
        status: 'success',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.user.id);
      
      res.status(200).json({
        status: 'success',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.user.id, req.body);
      
      res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  deleteProfile: async (req, res, next) => {
    try {
      await userService.deleteUser(req.user.id);
      
      res.status(200).json({
        status: 'success',
        message: 'Account deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);
      
      res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      
      res.status(200).json({
        status: 'success',
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
