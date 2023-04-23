const Image = require('../models/image');
const upload = require('../multer/index');

exports.uploadImage = async (req, res) => {
    try {
      const author = req.body.author;
      const imageUrl = req.file.filename;
  
      const image = new Image({
        author,
        imageUrl
      });
  
      await image.save();
  
      res.status(200).send("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error.");
    }
  };

  