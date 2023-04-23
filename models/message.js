const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Message = new  mongoose.model(
  "Message",
  new Schema({
    content: {
      type: String,
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  })
);
  
module.exports = Message;
