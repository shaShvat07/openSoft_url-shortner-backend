// routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'You have access to this protected route', userId: req.userId });
});

module.exports = router;
