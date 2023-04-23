const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new  mongoose.model(
  "Post",
  new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true
    },
    comments: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment' },
    likes: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Like' },
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

module.exports = Post;
