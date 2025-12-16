const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw 'Missing Authorization header';
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw 'Invalid token format';
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // If route has :id → check ownership
    if (req.params.id && Number(req.params.id) !== userId) {
        console.log(req.params.id);
        console.log(userId);
      throw 'Invalid user ID';
    }

    // If body has userId → check ownership
    if (req.body.id && Number(req.body.id) !== userId) {
      throw 'Invalid user ID';
    }

    // Attach user to request (VERY useful)
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = Auth;
