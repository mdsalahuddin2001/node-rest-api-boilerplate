const express = require("express");
const {
  getProducts,
  getSingleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
} = require("../controllers/productController");
const validate = require("../middlewares/validate");
const { productsValidation } = require("../validations");
const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

// router.post("/", createProduct);

// admin & super admin
router
  .route("/")
  .get(getProducts)
  .post(validate(productsValidation.createProduct), addProduct);

router.route("/:id/reviews").post(protect, reviewProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, authorize("admin", "super-admin"), deleteProduct)
  .patch(protect, authorize("admin", "super-admin"), updateProduct);
module.exports = router;
