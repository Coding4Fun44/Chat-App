const express = require("express");
const {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  loginUser,
  updateBio,
  updateFriendRequest,
  updateFriendList,
  removeFriendRequest,
  removeFriend,
  getMutualFriends,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:username", getOneUser);

router.post("/signup", createUser);

router.post("/login", loginUser);

router.delete("/:username", deleteUser);

router.patch("/:username", updateBio);

router.patch("/request/:user1/:user2", updateFriendRequest);

router.patch("/list/:user1/:user2", updateFriendList);

router.patch("/remove-request/:user1/:user2", removeFriendRequest);

router.patch("/remove-friend/:user1/:user2", removeFriend);

router.get("/:user1/:user2", getMutualFriends);

module.exports = router;
