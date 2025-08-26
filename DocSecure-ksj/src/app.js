const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const authRoutes = require('./routes/auth.routes');


require('dotenv').config();

const errorMiddleware = require('./middleware/error.middleware');
const routes = require('./routes/index.routes');
const logger = require('./utils/logger');

const app = express();

// Security middleware
app.use(express.json());  
app.use(helmet());
app.use(cors());
app.use(compression());
app.use('/api/auth', authRoutes);
// Logging middleware
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/v1', routes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
