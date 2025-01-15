// backend/routes/user.js
const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({ username: { $regex: query, $options: 'i' } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/post', async (req, res) => {
  const { userId, content } = req.body;
  try {
    const newPost = new Post({ userId, content });
    await newPost.save();
    res.status(201).json({ message: 'Post created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
