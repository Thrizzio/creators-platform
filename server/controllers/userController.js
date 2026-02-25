import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name, email, and password are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            // Exclude password from response
            const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };

            res.status(201).json(userResponse);
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc     Get all users
 * @route    GET /api/users
 * @access   Public
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc     Get user by ID
 * @route    GET /api/users/:id
 * @access   Public
 */
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Handle invalid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc     Update user
 * @route    PUT /api/users/:id
 * @access   Public
 */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        // Handle invalid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc     Delete user
 * @route    DELETE /api/users/:id
 * @access   Public
 */
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Handle invalid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
