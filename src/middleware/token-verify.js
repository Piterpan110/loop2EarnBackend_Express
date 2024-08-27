const tokenService = require('../service/token-service');
// Middleware function to verify access token
module.exports = {
  verifyAccessToken: async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(' ')[1]; // Extract access token from Authorization header
    console.log('____req.headers___', req.headers);
    console.log('accesstoken---', accessToken);
    if (!accessToken) {
      return res.status(401).json({ message: 'Access token missing!!!' });
    }
    console.log('req.headers.authorization----', req.headers.authorization);
    // Verify access token (pseudocode)

    const isValid = await tokenService.isValidAccessToken(accessToken);
    console.log('isValid---', isValid);
    if (isValid) {
      console.log('--------access token validation-------');

      res.status(200).json({ message: 'Valid access token' });
      console.log('--------next function-------');
      return next();
    } else {
      return res.status(401).json({ message: 'Invalid access token' });
    }
    // Access token is valid, proceed to the next middleware or route handler
  }
};
