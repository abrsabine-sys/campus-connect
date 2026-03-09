const express = require("express");
const router = express.Router();

const { create, login, joinSchool } = require("../model/user");

// REGISTER
router.post("/register", (req, res) => {

  const user = create(req.body);

  res.json(user);

});


// JOIN SCHOOL
router.post("/join-school", (req, res) => {

  const { userId, school } = req.body;

  const user = joinSchool(userId, school);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);

});

module.exports = router;