require("dotenv").config();

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRE = process.env.JWT_EXPIRE;

const defaultAvatar = process.env.defaultAvatar || "/images/users/avatar.jpg";
module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRE,
  defaultAvatar,
};
