const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

// Register-Create
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const defaultAvatar = generateRandomAvatar();

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ error: "Username is already registed." });
    }

    const existingUsermail = await User.findOne({ email });

    if (existingUsermail) {
      return res
        .status(400)
        .json({ error: "Email address is already registed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });

    await newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "invalid password" });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.name,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

module.exports = router;
