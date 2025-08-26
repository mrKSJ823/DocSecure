const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Protected routes
router.use(authMiddleware.protect);
router.get('/profile/me', userController.getMe);
router.put('/profile', userController.updateProfile);
router.delete('/profile', userController.deleteProfile);

// Admin only routes
router.use(authMiddleware.restrictTo('admin'));
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
