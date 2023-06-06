const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");
const { PORT, MONGO_URI } = require("./secret");

// connect database
connectDB(MONGO_URI);

// listen mongoose connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

// when database connection fails
mongoose.connection.on("error", (err) => {
  console.log(err);
});
