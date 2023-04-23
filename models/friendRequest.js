const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendRequest = new mongoose.model(
  "friendRequest",
  new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  })
);

module.exports = friendRequest;
