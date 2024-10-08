const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const messageController = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/authMiddlewarr');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Profile routes
router.post('/profiles', authenticateToken, profileController.createProfile);
router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:id', profileController.getProfileById);

// Message routes
router.post('/messages', authenticateToken, messageController.createMessage);
router.get('/messages', messageController.getMessages);

module.exports = router;
