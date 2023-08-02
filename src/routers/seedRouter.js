const express = require("express");
const { seedUsers, seedProducts } = require("../controllers/seedController");
const router = express.Router();

router.get("/users", seedUsers);
router.get("/products", seedProducts);

module.exports = router;
