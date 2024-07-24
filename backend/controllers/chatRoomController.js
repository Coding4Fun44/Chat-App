const { ChatRoom } = require("../models/chatRoomModel");
const mongoose = require("mongoose");

const createMessage = async (req, res) => {
  const { sender, text } = req.body;
  const { id } = req.params;

  try {
    const chatRoom = await ChatRoom.findOneAndUpdate(
      { _id: id },
      { $push: { messages: { sender, text } } }
    );
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllChatRooms = async (req, res) => {
  const chatRooms = await ChatRoom.find({}).sort({ createdAt: -1 });

  res.status(200).json(chatRooms);
};

const getNotJoinedRooms = async (req, res) => {
  const { userName } = req.params;

  try {
    const chatRooms = await ChatRoom.find({ userName: { $ne: userName } });
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneChatRoom = async (req, res) => {
  const { id } = req.params;

  const chatRoom = await ChatRoom.findById(id);

  res.status(200).json(chatRoom);
};

const getJoinedChatRooms = async (req, res) => {
  const { userName } = req.params;

  try {
    const chatRooms = await ChatRoom.find({ userName: userName });
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createChatRoom = async (req, res) => {
  const { name, description, messages, userName } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!messages.text) {
    emptyFields.push("messages");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const chatRoom = await ChatRoom.create({
      name,
      description,
      messages,
      userName: [userName],
    });
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const joinChatRoom = async (req, res) => {
  const { userName } = req.body;
  const { id } = req.params;

  try {
    const chatRoom = await ChatRoom.findOneAndUpdate(
      { _id: id },
      { $addToSet: { userName: userName } }
    );
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid chat room ID" });
  }

  try {
    const chatRoom = await ChatRoom.findById(id);
    res.status(200).json(chatRoom.messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteChatRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const chatRoom = await ChatRoom.findOneAndDelete({ _id: id });
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllChatRooms,
  createChatRoom,
  getAllMessages,
  createMessage,
  deleteChatRoom,
  joinChatRoom,
  getJoinedChatRooms,
  getOneChatRoom,
  getNotJoinedRooms,
};
