# Node.js Express Architecture

A production-ready Node.js Express application with clean architecture, security best practices, and scalable structure.

## Features

- **Clean Architecture**: Separated concerns with controllers, services, models, and middleware
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Authentication**: JWT-based authentication with refresh tokens
- **Database**: MongoDB with Mongoose ODM
- **Logging**: Winston logger with different levels
- **Error Handling**: Centralized error handling middleware
- **Validation**: Joi validation for request data
- **Testing**: Jest and Supertest setup
- **Environment Configuration**: Dotenv for environment variables

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
└── app.js          # Express app setup
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd express-architecture
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh-token` - Refresh JWT token

### Users
- `GET /api/v1/users` - Get all users (public)
- `GET /api/v1/users/:id` - Get user by ID (public)
- `GET /api/v1/users/profile/me` - Get current user profile (protected)
- `PUT /api/v1/users/profile` - Update current user profile (protected)
- `DELETE /api/v1/users/profile` - Delete current user account (protected)

### Health Check
- `GET /health` - Server health check

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/express_architecture
DB_NAME=express_architecture

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Database Seeding
```bash
# Add seeding scripts if needed
```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Cross-Origin Resource Sharing configuration
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Joi schema validation
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Error Handling**: Secure error messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
