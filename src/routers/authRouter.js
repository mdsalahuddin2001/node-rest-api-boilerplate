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
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/verify", activateAccount);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
