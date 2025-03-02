const express = require('express')
const { login, register, logout, refresh, getMe } = require('../controllers/auth.controller.js'); 
const { verifyToken } = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// refresh --
router.post('/refresh', refresh);

// get user --
router.get('/me', verifyToken, getMe);

module.exports = router;