const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

const getOneUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ userName: username });

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { userName, password } = req.body;

  let emptyFields = [];
  let weakPassword = [];

  if (!userName) {
    emptyFields.push("userName");
  }
  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  } else {
    if (password.length < 8) {
      weakPassword.push("Must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      weakPassword.push("Must include at least one upper case letter");
    }
    if (!/[a-z]/.test(password)) {
      weakPassword.push("Must include at least one lower case letter");
    }
    if (!/[0-9]/.test(password)) {
      weakPassword.push("Must include at least one digit");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      weakPassword.push("Must include at least one special character");
    }

    if (weakPassword.length > 0) {
      return res.status(400).json({
        weakPassword,
      });
    }
  }

  const exists = await User.findOne({ userName });

  if (exists) {
    return res
      .status(400)
      .json({ error: "Username already exists.", emptyFields });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ userName, password: hash });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  let emptyFields = [];

  if (!userName) {
    emptyFields.push("userName");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const user = await User.findOne({ userName });

  if (!user) {
    return res
      .status(400)
      .json({ error: "Incorrect username or password.", emptyFields });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res
      .status(400)
      .json({ error: "Incorrect username or password.", emptyFields });
  }

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndDelete({ userName: username });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBio = async (req, res) => {
  const { bio } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { userName: username },
      { bio: bio }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFriendRequest = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { userName: user2 },
      { $addToSet: { friendRequest: user1 } }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFriendList = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { userName: user2 },
      { $addToSet: { friendList: user1 } }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFriendRequest = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { userName: user2 },
      { $pull: { friendRequest: user1 } }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFriend = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { userName: user2 },
      { $pull: { friendList: user1 } }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMutualFriends = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const friends = await User.find({
      friendList: { $all: [user1, user2] },
    });
    res.status(200).json(friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  loginUser,
  updateBio,
  updateFriendList,
  updateFriendRequest,
  removeFriendRequest,
  removeFriend,
  getMutualFriends,
};
