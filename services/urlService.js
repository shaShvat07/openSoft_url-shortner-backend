// services/urlService.js
const Url = require('../models/Url');

function base10toBase62(num) {
    const elements = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let ret = '';

    while (num) {
        ret += elements[num % 62];
        num = Math.floor(num / 62);
    }

    while (ret.length < 7) {
        ret += '0';
    }

    return ret;
}

function generateShortUrl(counter) {
    const shortUrl = base10toBase62(counter);
    return `shorty.az/${shortUrl}`;
}

async function shortenUrl(originalUrl) {
    try {
        console.log("Original URL:", originalUrl);

        const existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            console.log("Existing URL found:", existingUrl);
            return existingUrl;
        }

        let counter = getRandomCounter();
        let shortUrl;
        let formattedShortUrl;

        do {
            // Retry with a new counter if a duplicate key error occurs
            counter++;
            shortUrl = generateShortUrl(counter);
            formattedShortUrl = "https://" + shortUrl;
            console.log("Formatted Short URL:", formattedShortUrl);

            // Check if the new shortUrl already exists
            const existingShortUrl = await Url.findOne({ shortUrl: formattedShortUrl });
            if (!existingShortUrl) {
                break; // Break the loop if the shortUrl is unique
            }
        } while (true);

        const newUrl = new Url({ originalUrl, shortUrl: formattedShortUrl });
        await newUrl.save();

        console.log("New URL saved:", newUrl);
        return newUrl;
    } catch (error) {
        console.error("Error in shortenUrl:", error);
        throw error; // Rethrow the error for better debugging
    }
}

function getRandomCounter() {
    // Generate a random starting value for the counter
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}



module.exports = {
    shortenUrl,
    generateShortUrl,
};
