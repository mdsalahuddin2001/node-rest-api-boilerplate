const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");
const { PORT, MONGO_URI } = require("./secret");
const logger = require("./utils/logger");
// connect database
connectDB(MONGO_URI);

// listen mongoose connection
mongoose.connection.once("open", () => {
  logger.log("info", "Connected to MongoDB");
  app.listen(PORT, () => {
    logger.log("info", `Server started on port ${PORT}`);
  });
});

// when database connection fails
mongoose.connection.on("error", (err) => {
  logger.log("error", err);
});
