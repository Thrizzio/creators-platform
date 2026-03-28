import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './config/database.js';
import createApp from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const configureSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    if (!process.env.JWT_SECRET) {
      return next(new Error('Authentication error: JWT secret is missing'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.user = decoded;
      return next();
    } catch (error) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${socket.id} | Reason: ${reason}`);
    });
  });

  return io;
};

const startServer = async () => {
  try {
    await connectDB();

    const httpServer = createServer();
    const io = configureSocketServer(httpServer);
    const app = createApp(io);

    httpServer.on('request', app);

    httpServer.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      );
      console.log('Socket.io ready for connections');
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
