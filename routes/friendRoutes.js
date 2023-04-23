const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const refreshToken = require('../middleware/refreshToken');
const FriendController = require('../controllers/friendController');

router.post('/friendRequests', authenticateToken, refreshToken, FriendController.sendFriendRequest);

router.put('/friendRequests/accept', authenticateToken, refreshToken, FriendController.acceptFriendRequest);

router.put('/friendRequests/reject', authenticateToken, refreshToken, FriendController.rejectFriendRequest);


module.exports = router;
