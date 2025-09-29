// middleware/auth.js

const jwt = require('jsonwebtoken');
import Student from '../models/student';

const authMiddleware = async (req, res, next) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).send({ error: 'Authentication failed' });
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '');

    // Verify the token and get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    // Find the user in the database
    const user = await Student.findOne({ _id: userId, 'tokens.token': token });

    if (!user) {
      return res.status(401).send({ error: 'Authentication failed' });
    }

    // Attach the user and token to the request object
    req.user = user;
    req.token = token;

    // Call the next middleware function
    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;