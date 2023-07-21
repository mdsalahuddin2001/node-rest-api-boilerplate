const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    logger.log("error", error);
  }
};

module.exports = connectDB;
