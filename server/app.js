import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import analyticsRoutes from './routes/analytics.js';
import uploadRoutes from './routes/upload.js';
import errorHandler from './middleware/errorMiddleware.js';

const createIoAdapter = (io) => {
  if (io && typeof io.emit === 'function') {
    return io;
  }

  return {
    emit: () => {},
  };
};

const createApp = (io) => {
  const app = express();
  const socketAdapter = createIoAdapter(io);

  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/api/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
    });
  });

  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes(socketAdapter));
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/upload', uploadRoutes);

  app.use(errorHandler);

  return app;
};

export default createApp;
