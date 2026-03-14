import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return next(createError(400, 'Name, email, and password are required'));
    }

    if (password.length < 6) {
      return next(createError(400, 'Password must be at least 6 characters'));
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return next(createError(400, 'User already exists with this email'));
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Login user and return JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!email || !password) {
      return next(createError(400, 'Email and password are required'));
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    // Keep this message generic to avoid leaking which part of credentials failed.
    if (!user) {
      return next(createError(401, 'Invalid email or password'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(401, 'Invalid email or password'));
    }

    /**
     * JWT (JSON Web Token) is a signed token used to prove user identity without server-side sessions.
     * Token format is: HEADER.PAYLOAD.SIGNATURE
     */
    if (!process.env.JWT_SECRET) {
      return next(createError(500, 'Server error'));
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Never return password hash to the client.
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    return next(error);
  }
};

