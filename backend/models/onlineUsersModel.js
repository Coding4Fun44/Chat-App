const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const onlineUsersSchema = new Schema(
  {
    onlineUsers: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Online Users", onlineUsersSchema);
