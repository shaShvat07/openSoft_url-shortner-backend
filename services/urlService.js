// services/urlService.js
const Url = require('../models/Url');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

// utilities functions 
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

function getRandomCounter() {
    // Generate a random starting value for the counter
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
// utilities functions end // 


// A1 shorten url
async function shortenUrl(originalUrl, token) {
    try {
        // Extract user ID from the JWT token
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.jwt_secret);
        const userId = decodedToken.userId;
        let user = await getUserById(userId);
        // Check if the user already has the same originalUrl in their URLs
        const existingUrl = await Url.findOne({ originalUrl: originalUrl, user: userId });
        if (existingUrl) {
            return existingUrl; // Return the existing URL if found
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


        let newUrl = await Url.create({
            originalUrl: originalUrl,
            shortUrl: formattedShortUrl,
            user: userId
        });

        await newUrl.save();
        console.log("New URL saved:", newUrl);

        // Update the user object by adding the URL id to the urls array
        user.urls.push(newUrl._id);
        await user.save();
        return newUrl;
    } catch (error) {
        console.error("Error in shortenUrl:", error);
        throw error; // Rethrow the error for better debugging
    }
}

// A2 Get url by id
async function getUrlById(urlId, userId) {
    try {
        // Removed the validation since urlId is a string
        const url = await Url.findOne({ _id: urlId, user: userId });
        if (!url) {
            throw new Error('URL not found or does not belong to the user');
        }

        return url;
    } catch (error) {
        console.error("Error in getUrlById:", error);
        throw error;
    }
}

// A3 Get complete user by id
async function getUserById(userId) {
    try {
        // Removed the validation since userId is a string
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error("Error in getUserById:", error);
        throw error;
    }
}


module.exports = {
    shortenUrl,
    getUrlById,
    getUserById
};
