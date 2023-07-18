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
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const validate = require("../middlewares/validate");
const { authValidation } = require("../validations/");
const upload = require("../middlewares/uploadFile");
const router = express.Router();

router.post(
  "/register",
  // upload.single("image"),
  validate(authValidation.register),
  register
);
router.post("/verify", activateAccount);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
