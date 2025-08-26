const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js

describe('Authentication', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register') // Adjust the endpoint as necessary
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        name: 'Test User'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data.user.email', 'testuser@example.com');
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login') // Adjust the endpoint as necessary
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data.user.email', 'testuser@example.com');
  });

  it('should not login a user without a password', async () => {
    const res = await request(app)
      .post('/api/auth/login') // Adjust the endpoint as necessary
      .send({
        email: 'testuser@example.com',
        password: ''
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User account has no password set. Please contact support.');
  });
});
