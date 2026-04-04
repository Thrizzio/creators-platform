import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'Not authorized, token missing'));
    }

    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
      return next(createError(500, 'Server error'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return next(createError(401, 'Not authorized, user not found'));
    }

    req.user = {
      ...user.toObject(),
      id: user._id.toString(),
    };
    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(createError(401, 'Not authorized, token failed'));
    }

    return next(error);
  }
};

export default protect;
