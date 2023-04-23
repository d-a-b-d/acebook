const User = require("../models/user");
const FriendRequest = require('../models/friendRequest');

exports.sendFriendRequest = async (req, res) => {
    try {
      const sender = req.body.sender;
      const recipient = req.body.recipient;
  
      if (sender === recipient) {
        return res.status(400).json({ error: "Cannot add yourself as a friend." });
      }
  
      const friendRequest = new FriendRequest({
        sender,
        recipient,
        status: "pending",
      });
  
      await friendRequest.save();
  
      res.status(200).send("Friend request sent successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error.");
    }
  };
  
exports.acceptFriendRequest = async (req, res) => {
    const sender = req.body.sender;
    const recipient = req.body.recipient;
  
    try {
      const friendRequest = await FriendRequest.findOne({ sender, recipient, status: "pending" });
  
      if (!friendRequest) {
        throw new Error("Friend request not found.");
      }
  
      friendRequest.status = "accepted";
      await friendRequest.save();
  
      res.status(200).send("Friend request accepted successfully.");
    } catch (error) {
      res.status(400).send(error.message);
    }
};
  

exports.rejectFriendRequest = async (req, res) => {
    const sender = req.body.sender;
    const recipient = req.body.recipient;
  
    try {
      const friendRequest = await FriendRequest.findOne({ sender, recipient, status: "pending" });
  
      if (!friendRequest) {
        throw new Error("Friend request not found.");
      }
  
      friendRequest.status = "rejected";
      await friendRequest.save();
  
      res.status(200).send("Friend request rejected successfully.");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  

exports.getFriends = async (req, res) => {
    //
  }

