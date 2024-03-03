// app.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB // security
mongoose.connect(process.env.DB_URI);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use('/api/url', urlRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
