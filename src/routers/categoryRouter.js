const express = require("express");

const {
  addCategory,
  getCategories,
  categoryCache,
} = require("../controllers/categoryController");

const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

router.get("/", categoryCache, getCategories);
router.post("/", addCategory);
// router.get("/:id", getUser);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);
module.exports = router;
