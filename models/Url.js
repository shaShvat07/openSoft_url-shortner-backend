// models/Url.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String, // Make sure it's defined as a String
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
