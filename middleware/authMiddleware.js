// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const header = req.header('Authorization');
  const bearer = header.split(' ');
  const token = bearer[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.token = token;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
