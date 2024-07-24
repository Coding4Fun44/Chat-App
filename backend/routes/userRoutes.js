const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signup", createUser);

router.post("/login", loginUser);

router.delete("/:id", deleteUser);

module.exports = router;
