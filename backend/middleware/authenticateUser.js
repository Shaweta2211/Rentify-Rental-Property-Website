const jwt = require('jsonwebtoken');
const User = require('../modules/User'); // Adjust path as needed

const authenticateUser = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with process.env.JWT_SECRET if using .env
    const user = await User.findById(decoded.userId).select('-password'); // Fetch full user info

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach full user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
