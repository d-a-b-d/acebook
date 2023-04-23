const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Image = new  mongoose.model(
  "Image",
  new Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    published: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  })
);
  
module.exports = Image;
