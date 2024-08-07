const Online = require("../models/onlineUsersModel");
const mongoose = require("mongoose");

const onlineUsers = [];

const updateOnlineUsers = async (req, res) => {
  const { username } = req.body;

  if (!onlineUsers.includes(username)) {
    onlineUsers.push(username);
  } else {
    const index = onlineUsers.indexOf(username);
    onlineUsers.splice(index, 1);
  }

  return res.status(200).json(onlineUsers);
};

const getOnlineUsers = async (req, res) => {
  return res.status(200).json(onlineUsers);
};

module.exports = { updateOnlineUsers, getOnlineUsers };
