const { DmRoom } = require("../models/dmModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const createDmMessage = async (req, res) => {
  const { sender, text } = req.body;
  const { id } = req.params;

  try {
    const dmRoom = await DmRoom.findOneAndUpdate(
      { _id: id },
      { $push: { messages: { sender, text } } }
    );
    res.status(200).json(dmRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getJoinedDms = async (req, res) => {
  const { userName } = req.params;

  try {
    const dmRooms = await DmRoom.find({ userName: userName });
    res.status(200).json(dmRooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneDmRoom = async (req, res) => {
  const { id } = req.params;

  const dmRoom = await DmRoom.findById(id);

  res.status(200).json(dmRoom);
};

const createDmRoom = async (req, res) => {
  const { name, messages, userName } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!messages.text) {
    emptyFields.push("messages");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const exists = await User.findOne({ userName: name });

  if (!exists) {
    return res.status(400).json({ error: "User does not exist", emptyFields });
  }

  const dmExists = await DmRoom.findOne({
    userName: { $all: [userName, name] },
  });

  if (dmExists) {
    return res
      .status(400)
      .json({ error: "A DM already exists with this person", emptyFields });
  }

  try {
    const dmRoom = await DmRoom.create({
      name,
      messages,
      userName: [userName, name],
    });
    res.status(200).json(dmRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllDmMessages = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid chat room ID" });
  }

  try {
    const dmRoom = await DmRoom.findById(id);
    res.status(200).json(dmRoom.messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDmRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const dmRoom = await DmRoom.findOneAndDelete({ _id: id });
    res.status(200).json(dmRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeUserFromDmRooms = async (req, res) => {
  const { userName } = req.params;

  try {
    const chatRooms = await DmRoom.updateMany(
      { userName: userName },
      { $pull: { userName: userName } }
    );
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDmMessage,
  getJoinedDms,
  createDmRoom,
  getAllDmMessages,
  deleteDmRoom,
  getOneDmRoom,
  removeUserFromDmRooms,
};
