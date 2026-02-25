import express from 'express';
import {
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Route: POST /api/users/register
router.post('/register', registerUser);

// Route: GET /api/users
router.get('/', getAllUsers);

// Route: GET /api/users/:id
router.get('/:id', getUserById);

// Route: PUT /api/users/:id
router.put('/:id', updateUser);

// Route: DELETE /api/users/:id
router.delete('/:id', deleteUser);

export default router;
