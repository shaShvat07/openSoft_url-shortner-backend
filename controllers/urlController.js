// controllers/urlController.js
const urlService = require('../services/urlService');
const jwt = require('jsonwebtoken');

async function shortenUrl(req, res) {
    try {
        const { originalUrl } = req.body;
        const header = req.header('Authorization');
        const bearer = header.split(' ');
        const token = bearer[1];
        const newUrl = await urlService.shortenUrl(originalUrl, token); // Pass user ID to associate the URL with the user
        res.json(newUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUrlById(req, res) {
    try {
        const urlId = req.params.id;
        const header = req.header('Authorization');
        const bearer = header.split(' ');
        const token = bearer[1];
        const decodedToken = jwt.verify(token, process.env.jwt_secret);
        const userId = decodedToken.userId;
        // console.log(urlId);
        // console.log(userId);
        const url = await urlService.getUrlById(urlId, userId); // Pass user ID to ensure user ownership
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        res.json(url);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await urlService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    shortenUrl,
    getUrlById,
    getUserById
};
