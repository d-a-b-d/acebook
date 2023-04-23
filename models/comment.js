const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Comment = new mongoose.model(
    "Comment",
    new Schema({
    content: {
      type: String,
      required: true
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    author_name: {
      type: String,
      required: true
    },
    author_email: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  })
);

 
module.exports = Comment;
