import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import createApp from '../app.js';
import connectDB, { disconnectDB } from '../config/database.js';
import User from '../models/User.js';

const app = createApp();

describe('Auth API integration tests', () => {
  let mongoServer;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET =
      process.env.JWT_SECRET || 'test_secret_key_that_is_long_enough_for_jwt';
    process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI_TEST = mongoServer.getUri('creators-platform-test');

    await connectDB();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDB();

    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  test('registers a user with valid data', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Alice Creator',
      email: 'alice@example.com',
      password: 'secret123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: 'Account created successfully',
      data: expect.objectContaining({
        id: expect.any(String),
        name: 'Alice Creator',
        email: 'alice@example.com',
      }),
    });
  });

  test('rejects registration with an existing email', async () => {
    await User.create({
      name: 'Alice Creator',
      email: 'alice@example.com',
      password: 'secret123',
    });

    const response = await request(app).post('/api/auth/register').send({
      name: 'Another Alice',
      email: 'alice@example.com',
      password: 'secret123',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'User already exists with this email',
    });
  });

  test('rejects registration when required fields are missing', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'missing-name@example.com',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Name, email, and password are required',
    });
  });

  test('logs in with correct credentials', async () => {
    await User.create({
      name: 'Alice Creator',
      email: 'alice@example.com',
      password: 'secret123',
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'alice@example.com',
      password: 'secret123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Login successful',
      token: expect.any(String),
      user: expect.objectContaining({
        id: expect.any(String),
        name: 'Alice Creator',
        email: 'alice@example.com',
        role: 'user',
      }),
    });
  });

  test('rejects login with the wrong password', async () => {
    await User.create({
      name: 'Alice Creator',
      email: 'alice@example.com',
      password: 'secret123',
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'alice@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: 'Invalid email or password',
    });
  });
});
