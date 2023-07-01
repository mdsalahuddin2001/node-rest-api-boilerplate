const express = require("express");

const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const {
  register,
  activateAccount,
  login,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/verify", activateAccount);
router.post("/login", login);

module.exports = router;
