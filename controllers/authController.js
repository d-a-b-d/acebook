const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.find({email: req.body.email })
      .exec()
      .then(users => { 
        if(users.length >= 1) {
          return res.status(409).json({
            message: "Email already taken"
          })
        }
        else {

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });

    user.save()
      .then(() => {
        
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );

         const refreshToken = jwt.sign(
         { userId: user._id },
         process.env.REFRESH_TOKEN,
         { expiresIn: '7d' }
         );

         user.refreshTokens.push({
          token: refreshToken,
          expiresAt: moment().add(7, 'days').toDate()
        });

        return user.save();
      })
      .then(() => {
        res.status(201).json({ message: 'User created', token, refreshToken });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
}
})
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .select('+password')
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Auth failed' });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
            console.log(req.body.password);
            console.log(user.password);
            console.log(user.email);
            console.log(req.body.email);
          return res.status(401).json({ message: 'Auth failed here' });
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        res.status(401).json({ message: 'Auth failed here here' });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.logout = (req, res, next) => {
  const userId = req.userData.userId
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.refreshTokens = user.refreshTokens.filter(token => token.token !== req.body.refreshToken);
      user.save()
      .then(() => {
        res.status(200).json({message: 'Logout success!'})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};