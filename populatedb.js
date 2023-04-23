const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const FriendRequest = require('./models/friendRequest');

async function populateDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/acebook');

    const users = [
      { firstName: 'John', lastName:'Smith', email: 'hello@kitty.com', password: 'password123' },
      { firstName: 'Jane', lastName:'Jones', email: 'hell@kitty.com', password: 'password456' }
    ];

    const createdUsers = await User.insertMany(users);
   
      
    const friendRequests = [
    { sender: createdUsers[0]._id, receiver: createdUsers[1]._id },
    ];
      
    const createdFriendRequests = await FriendRequest.insertMany(friendRequests);

    const posts = [
      { title: 'First post', content: 'This is the content of the first post', author: createdUsers[0]._id },
      { title: 'Second post', content: 'This is the content of the second post', author: createdUsers[1]._id },
      { title: 'Third post', content: 'This is the content of the third post', author: createdUsers[0]._id }
    ];
    
    const createdPosts = await Post.insertMany(posts);
      
      console.log("Sample data inserted successfully!");
      } catch (err) {
      console.error(err.message);
      } finally {
      mongoose.connection.close();
     }
}
      
populateDB();