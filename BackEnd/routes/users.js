const express = require("express");
const router = express.Router();
const User = require("../model/user.js");

// register
router.post("/register", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) return res.status(400).json({ error: "Missing fields" });

  const user = User.create({ username, email });
  res.json(user);
});

// join school
router.post("/join-school", (req, res) => {
  const { userId, school } = req.body;

  const user = User.joinSchool(userId, school);

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

module.exports = router;