import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import protect from '../middleware/protect.js';

const postRoutes = (io) => {
  const router = express.Router();

  router.post('/', protect, (req, res, next) => createPost(req, res, next, io));
  router.get('/', protect, getPosts);
  router.get('/:id', protect, getPostById);
  router.put('/:id', protect, updatePost);
  router.delete('/:id', protect, deletePost);

  return router;
};

export default postRoutes;
