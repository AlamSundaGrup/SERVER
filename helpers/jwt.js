require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_TOKEN = process.env.SECRET_TOKEN;

const createToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_TOKEN);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_TOKEN);
  } catch (error) {
    console.error('Invalid or expired token:', error.message);
    return null;  // Or throw error depending on how you want to handle it
  }
};

module.exports = { createToken, verifyToken };
