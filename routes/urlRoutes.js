// routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// POST route to create a short URL
router.post('/shorten', urlController.shortenUrl);

module.exports = router;
