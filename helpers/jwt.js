require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_TOKEN = process.env.SECRET_TOKEN;

const createToken = (payload) => jwt.sign(payload, SECRET_TOKEN);
const verifyToken = (token) => jwt.verify(token, SECRET_TOKEN);

module.exports = { createToken, verifyToken };
