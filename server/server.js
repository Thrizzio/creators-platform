import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

/**
 * CORS Configuration
 * Why CORS is needed: Browsers block cross-origin requests by default for security. 
 * CORS allows the server to specify who can access its resources.
 * 
 * Origin: Specifies the URL of the frontend allowed to make requests.
 * Credentials: Allowed to send cookies or authorization headers with the request.
 * optionsSuccessStatus: 200 is used for legacy browser compatibility.
 * 
 * Why NOT use wildcard (*): Using * in production is dangerous as it allows ANY website 
 * to make requests to your API, potentially leading to CSRF or data leaks.
 */
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware - Applied BEFORE routes
app.use(cors(corsOptions));
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

// Error Handling Middleware (Generic)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
