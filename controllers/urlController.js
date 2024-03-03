// controllers/urlController.js
const urlService = require('../services/urlService');

async function shortenUrl(req, res) {
    try {
        const { originalUrl } = req.body;
        const newUrl = await urlService.shortenUrl(originalUrl);
        res.json(newUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    shortenUrl,
};
