// roleMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to restrict access based on roles
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No Token Provided!' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the user has one of the allowed roles
      if (roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(403).json({ message: 'Access Denied. Insufficient permissions!' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  };
};

module.exports = roleMiddleware;
