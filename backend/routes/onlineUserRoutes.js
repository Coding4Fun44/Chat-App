const express = require("express");
const {
  updateOnlineUsers,
  getOnlineUsers,
} = require("../controllers/onlineUsersController");

const router = express.Router();

router.patch("/", updateOnlineUsers);

router.get("/", getOnlineUsers);

module.exports = router;
