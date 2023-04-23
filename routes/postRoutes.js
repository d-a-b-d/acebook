const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateToken = require('../middleware/auth');
const refreshToken = require('../middleware/refreshToken');

router.get("/posts", authenticateToken, refreshToken, postController.getAllPosts);
router.get("/posts/:id", authenticateToken, refreshToken, postController.getPostById);
router.post("/posts", authenticateToken, refreshToken, postController.createPost);
router.patch("/posts/:id", authenticateToken, refreshToken, postController.updatePostById);
router.delete("/posts/:id", authenticateToken, refreshToken, postController.deletePostById);

module.exports = router;
