const express = require("express");

const {
  addCategory,
  getCategories,
  categoryCache,
} = require("../controllers/categoryController");
const validate = require("../middlewares/validate");
const { protect, authorize } = require("../middlewares/auth");
const { categoryValidation } = require("../validations");
const router = express.Router();

router.get("/", categoryCache, getCategories);
router.post("/", validate(categoryValidation.createCategory), addCategory);
// router.get("/:id", getUser);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);
module.exports = router;
