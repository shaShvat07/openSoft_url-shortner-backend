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

// DELETE route to delete a URL by its ID
router.delete('/url/:id', authMiddleware, urlController.deleteUrlById);

// DELETE route to cascade delete a user by user ID
router.delete('/user/:id', authMiddleware, urlController.cascadeDeleteUserById);

// PUT route to update user information (name or password) by user ID
router.put('/user/:id', authMiddleware, urlController.updateUser);

module.exports = router;
