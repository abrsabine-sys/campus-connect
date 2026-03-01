// BackEnd/routes/users.js
const express = require('express');
const router = express.Router();

// Correct relative path to model
const User = require('../model/user.js');

// Register a new user
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const newUser = User.create({ name, email });
  res.json(newUser);
});

// Join a school
router.post('/:id/join-school', (req, res) => {
  const { id } = req.params;
  const { school } = req.body;

  const user = User.joinSchool(Number(id), school);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
});

module.exports = router;