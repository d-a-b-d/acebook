const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/sign-up', authController.signup);

router.post('/log-in', authController.login);

router.post('log-out', authController.logout);

module.exports = router;