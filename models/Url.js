// models/Url.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const urlSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Assigning unique id using uuid
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
  user: { type: String, ref: 'User' },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
