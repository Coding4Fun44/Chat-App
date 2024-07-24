const express = require("express");
const {
  getAllChatRooms,
  createChatRoom,
  getAllMessages,
  createMessage,
  deleteChatRoom,
  joinChatRoom,
  getJoinedChatRooms,
  getOneChatRoom,
  getNotJoinedRooms,
} = require("../controllers/chatRoomController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
//router.use(requireAuth);

router.get("/", getAllChatRooms);

router.get("/joined/:userName", getJoinedChatRooms);

router.get("/not-joined/:userName", getNotJoinedRooms);

router.post("/", createChatRoom);

router.get("/messages/:id", getAllMessages);

router.post("/:id", createMessage);

router.delete("/:id", deleteChatRoom);

router.patch("/:id", joinChatRoom);

router.get("/chat-room/:id", getOneChatRoom);

module.exports = router;
