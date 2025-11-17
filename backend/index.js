// index.js (diagnostic-safe)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

function assertRouter(obj, name) {
  if (!obj) {
    console.error(`[ERROR] ${name} is undefined or null`);
    return false;
  }
  // express Router is a function (callable middleware)
  if (typeof obj !== 'function' && typeof obj !== 'object') {
    console.error(`[ERROR] ${name} is wrong type:`, typeof obj);
    console.error(name, obj);
    return false;
  }
  return true;
}

let authRoutes, postsRoutes, commentsRoutes;
try {
  authRoutes = require('./routes/auth');
  postsRoutes = require('./routes/posts');
  commentsRoutes = require('./routes/comments');
} catch (err) {
  console.error('Error loading routes:', err);
  process.exit(1);
}

console.log('authRoutes typeof =>', typeof authRoutes);
console.log('postsRoutes typeof =>', typeof postsRoutes);
console.log('commentsRoutes typeof =>', typeof commentsRoutes);

const app = express();
app.use(cors());
app.use(express.json());

// Validate before mounting
if (!assertRouter(authRoutes, 'authRoutes')) process.exit(1);
if (!assertRouter(postsRoutes, 'postsRoutes')) process.exit(1);
if (!assertRouter(commentsRoutes, 'commentsRoutes')) process.exit(1);

// Mount
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
