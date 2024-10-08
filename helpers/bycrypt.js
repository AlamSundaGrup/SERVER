const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed
}

async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }

module.exports = { hashPassword, comparePassword };
