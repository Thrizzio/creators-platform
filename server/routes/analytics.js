import express from 'express';
import protect from '../middleware/protect.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

// Placeholder analytics endpoints (no Song/Playlist models exist yet)
// Admin-only access

router.get(
  '/top-artists',
  protect,
  authorize('admin'),
  async (req, res) => {
    // Placeholder aggregation pipeline
    res.status(200).json({ 
      success: true, 
      data: [
        { artist: 'Artist 1', plays: 1500 },
        { artist: 'Artist 2', plays: 1200 },
        { artist: 'Artist 3', plays: 900 }
      ] 
    });
  }
);

router.get(
  '/most-active-users',
  protect,
  authorize('admin'),
  async (req, res) => {
    // Placeholder aggregation pipeline
    res.status(200).json({ 
      success: true, 
      data: [
        { user: 'User 1', posts: 45 },
        { user: 'User 2', posts: 32 },
        { user: 'User 3', posts: 28 }
      ] 
    });
  }
);

export default router;

