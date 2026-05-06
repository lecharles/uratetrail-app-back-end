const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/sign-up", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ err: `Username ${req.body.username} is already taken` });
    }

    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, 12),
    });

    const token = jwt.sign({ user }, process.env.SECRET_KEY);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ err: "Invalid credentials" });
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.hashedPassword);
    if (!isValidPassword) {
      return res.status(401).json({ err: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = router;