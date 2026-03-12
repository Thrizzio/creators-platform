import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
</xai:function_call

<xai:function_call name="edit_file">
<parameter name="path">server/server.js

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware - Applied BEFORE routes
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: "Server is running!",
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes(io));

app.use(errorHandler);

// Create HTTP server and Socket.io
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log(
    `User connected: ${socket.id} | Email: ${socket.data.user.email}`
  );

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}`, reason);
  });
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log("Socket.io ready for connections");
});
