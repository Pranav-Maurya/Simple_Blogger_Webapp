// routes/posts.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// create post
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)', [req.user.id, title, content]);
    res.json({ id: result.insertId });
  } catch (err) { res.status(500).json({ message: 'Error creating post' }); }
});

// get all posts (latest first)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, u.username FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Error fetching posts' }); }
});

// get single post with comments
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const [[post]] = await pool.query('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id=u.id WHERE p.id=?', [postId]);
    if (!post) return res.status(404).json({ message: 'Not found' });

    const [comments] = await pool.query(`
      SELECT c.*, u.username FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `, [postId]);
    res.json({ post, comments });
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

// update post
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    // ensure owner
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Not found' });
    if (rows[0].user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await pool.query('UPDATE posts SET title=?, content=? WHERE id=?', [title, content, id]);
    res.json({ message: 'Updated' });
  } catch (err) { res.status(500).json({ message: 'Error updating' }); }
});

// delete post
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Not found' });
    if (rows[0].user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Error deleting' }); }
});

module.exports = router;
