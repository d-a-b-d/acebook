const Like = require("../models/like");

exports.likePost = async (req, res) => {
  const { post } = req.body;
  const { user } = req.body;

  try {
    const newLike = new Like({ user: user, post: post });
    await newLike.save();

    res.status(201).json(newLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.unlikePost = async (req, res) => {
  const { post } = req.body;
  const { user } = req.body;

  try {
    const existingLike = await Like.findOneAndDelete({ user: user, post: post });

    if (!existingLike) {
      return res.status(400).json({ message: 'Post not liked' });
    }

    res.status(200).json({ message: 'Post unliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

