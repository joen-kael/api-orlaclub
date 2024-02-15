const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const config = require('../config');
const { secret } = config;

const generateToken = (data) => {
  // @ts-ignore
  return jwt.sign(data, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePasswords
}