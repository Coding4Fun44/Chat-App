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

const dmSchema = new Schema(
  {
    name: {
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
  },
  { timestamps: true }
);

const DmMessage = mongoose.model("DmMessage", messageSchema);
const DmRoom = mongoose.model("DmRoom", dmSchema);

module.exports = {
  DmMessage,
  DmRoom,
};
