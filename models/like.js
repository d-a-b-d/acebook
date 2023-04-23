const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
