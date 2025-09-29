// routes/user.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('.././middlewares/auth');
const Student = require('.././models/student');

// Update the logged-in user's information
router.put('/users/me', authMiddleware, async (req, res) => {
  constupdates = req.body;

  try {
    // Find the current user by ID and update their information
    const user = await Student.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    // Send the updated user object as the response
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;