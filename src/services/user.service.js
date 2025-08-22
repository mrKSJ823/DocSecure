const User = require('../models/user.model');
const logger = require('../utils/logger');

const userService = {
  getAllUsers: async ({ page = 1, limit = 10 }) => {
    const skip = (page - 1) * limit;
    
    const users = await User.find({ isActive: true })
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments({ isActive: true });

    return {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  },

  getUserById: async (id) => {
    const user = await User.findById(id).select('-password');
    
    if (!user || !user.isActive) {
      throw new Error('User not found');
    }

    return user;
  },

  createUser: async (userData) => {
    const { email, password, name, role = 'user' } = userData;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const user = await User.create({ email, password, name, role });
    
    return user.toObject();
  },

  updateUser: async (id, updateData) => {
    const user = await User.findById(id);
    
    if (!user || !user.isActive) {
      throw new Error('User not found');
    }

    // Remove password from update data if provided
    delete updateData.password;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    return updatedUser;
  },

  deleteUser: async (id) => {
    const user = await User.findById(id);
    
    if (!user || !user.isActive) {
      throw new Error('User not found');
    }

    // Soft delete
    user.isActive = false;
    await user.save();
    
    return { message: 'User deleted successfully' };
  }
};

module.exports = userService;
