require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Token } = require('../database/models');
const { User } = require('../database/models');
module.exports = {
  generateAccessToken: async (userid, email) => {
    const accesstoken = jwt.sign({ userid, email }, process.env.ASECRET, {
      expiresIn: '1h'
    });
    return accesstoken;
  },
  generateRefreshToken: async (userid, email) => {
    const refreshtoken = jwt.sign({ userid, email }, process.env.RSECRET, {
      expiresIn: '168h'
    });
    return refreshtoken;
  },
  isValidAccessToken: async (accessToken) => {
    try {
      const decodedToken = jwt.verify(accessToken, process.env.ASECRET);
      const user = await User.findOne({ where: { id: decodedToken.userid } });

      // Example function to fetch user from database
      if (decodedToken.email === user.email) {
        return true; // Token is valid
      } else {
        console.log('error occured!');
        return false; // User not found or username mismatch
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return false; // Token is invalid or has expired
    }
  },
  refreshAcess: async (refreshtoken) => {
    const tokenid = await Token.findOne({ where: { refreshtoken } });
    return tokenid;
  }
};
