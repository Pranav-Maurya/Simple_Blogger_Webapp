// routes/comments.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// add comment (any logged in user)
router.post('/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    await pool.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, req.user.id, content]);
    res.json({ message: 'Comment added' });
  } catch (err) { res.status(500).json({ message: 'Error adding comment' }); }
});

// get comments for a post (
module.exports = router;
