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

const createUser = async (req, res) => {
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

    const token = createToken(user._id);

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

  const token = createToken(user._id);

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  loginUser,
};
