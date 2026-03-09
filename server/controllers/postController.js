import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      status,
    } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      category: category?.trim() || '',
      status: status || 'draft',
      author: req.user._id,
    });

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find({ author: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments({ author: req.user._id }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const authorId = post.author?._id ? post.author._id.toString() : post.author.toString();
    if (authorId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this post' });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const {
      title,
      content,
      category,
      status,
    } = req.body;

    if (title !== undefined) {
      post.title = title;
    }

    if (content !== undefined) {
      post.content = content;
    }

    if (category !== undefined) {
      post.category = category;
    }

    if (status !== undefined) {
      post.status = status;
    }

    await post.save();

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
