const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');
const refreshToken = require('../middleware/refreshToken');

router.get('/users', authenticateToken, refreshToken, userController.getUsers);
router.get('/users/:id', authenticateToken, refreshToken, userController.getUserById);
router.post('/users/create', authenticateToken, refreshToken, userController.createUser);
router.patch('/users/update/:id', authenticateToken, refreshToken, userController.updateUser);
router.delete('/users/delete/:id', authenticateToken, refreshToken, userController.deleteUser);

module.exports = router;
