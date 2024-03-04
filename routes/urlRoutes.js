// routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

// GET route to access a unique URL by its ID
router.get('/url/:id', authMiddleware, urlController.getUrlById);

// GET route to access user information by user ID
router.get('/user/:id', authMiddleware, urlController.getUserById);

// POST route to create a short URL
router.post('/shorten', authMiddleware, urlController.shortenUrl);

module.exports = router;
