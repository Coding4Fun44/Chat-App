const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatRoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userName: [
      {
        type: String,
        required: true,
      },
    ],
    messages: [messageSchema],
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = {
  Message,
  ChatRoom,
};
