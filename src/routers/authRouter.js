const express = require("express");

const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const { register } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

module.exports = router;
