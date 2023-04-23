const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const authenticateToken = require('../middleware/auth');
const refreshToken = require('../middleware/refreshToken');

router.post('/like/', authenticateToken, refreshToken, LikeController.likePost);

router.post('/unlike/', authenticateToken, refreshToken, LikeController.unlikePost);

module.exports = router;
