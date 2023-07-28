const express = require("express");
const { demo } = require("../controllers/demoController");

const router = express.Router();

router.get("/", demo);
module.exports = router;
