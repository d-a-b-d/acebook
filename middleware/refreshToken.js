const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

function refreshToken(req, res, next) {
  const accessToken = req.headers.authorization.split(' ')[1];
  const refreshToken = req.body.refreshToken;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }

        User.findOne({ email: decoded.email })
          .exec()
          .then(user => {
            if (!user) {
              return res.status(403).json({ message: 'Invalid refresh token' });
            }
            const tokenIndex = user.refreshTokens.findIndex(token => token.token === refreshToken);
            if (tokenIndex === -1) {
              return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const newAccessToken = jwt.sign({ email: decoded.email, 
                                              userId: decoded.userId }, 
                                              process.env.JWT_SECRET, 
                                              { expiresIn: '15m' });
            res.set('Authorization', 'Bearer ' + newAccessToken);
            req.userData = decoded;
            next();
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

module.exports = refreshToken;
