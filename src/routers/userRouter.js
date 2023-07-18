const express = require("express");

const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

router.get("/", protect, authorize("admin", "super-admin"), getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
