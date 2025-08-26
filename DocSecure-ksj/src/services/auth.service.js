const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require('../utils/logger');

const authService = {
  register: async (userData) => {
    const { email, password, name } = userData;
    
    // Check if user already exists
    const existingUser = await User.findOne(email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    await User.create({ email, password, name });
    
    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    return {
      user: {
        email,
        name,
        role: 'user' // Default role
      },
      token
    };
  },

  login: async (email, password) => {
    // Check if user exists
    const user = await User.findOne(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if user has a password
    if (!user.Password) {
      throw new Error('User account has no password set. Please contact support.');
    }

    // Check password
    const isPasswordMatch = await User.comparePassword(password, user.Password);

    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    return {
      user: {
        email,
        name: user.name,
        role: user.role
      },
      token
    };
  },

  refreshToken: async (refreshToken) => {
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findOne(decoded.email);
    
    if (!user) {
      throw new Error('User not found');
    }

    const newToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    return { token: newToken };
  }
};

module.exports = authService;
