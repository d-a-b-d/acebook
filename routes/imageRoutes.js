const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imageController');
const upload = require('../multer/index');

router.post('/upload-image', upload.single('image'), ImageController.uploadImage);

module.exports = router;