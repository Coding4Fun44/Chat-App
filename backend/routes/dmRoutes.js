const express = require("express");
const {
  createDmMessage,
  getJoinedDms,
  createDmRoom,
  getAllDmMessages,
  deleteDmRoom,
  getOneDmRoom,
  removeUserFromDmRooms,
} = require("../controllers/dmController");

const router = express.Router();

router.get("/:userName", getJoinedDms);

router.post("/:id", createDmMessage);

router.post("/", createDmRoom);

router.get("/messages/:id", getAllDmMessages);

router.delete("/:id", deleteDmRoom);

router.get("/room/:id", getOneDmRoom);

router.patch("/:userName", removeUserFromDmRooms);

module.exports = router;
