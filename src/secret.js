require("dotenv").config();

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

const jwtActivationSecret = process.env.JWT_ACCOUNT_ACTIVATION_SECRET;
const jwtActivationExpire = process.env.JWT_ACCOUNT_ACTIVATION_EXPIRE;

const access_secret = process.env.ACCESS_TOKEN_SECRET;
const access_expire = process.env.ACCESS_TOKEN_EXPIRE;

const refresh_secret = process.env.REFRESH_TOKEN_SECRET;
const refresh_expire = process.env.REFRESH_TOKEN_EXPIRE;

const clientUrl = process.env.CLIENT_URL;

const defaultAvatar = process.env.defaultAvatar || "/images/users/avatar.jpg";

const uploadDir = process.env.UPLOAD_DIR || "public/images/users";

const smtpHost = process.env.SMTP_HOST || "";
const smtpPort = process.env.SMTP_PORT || "";
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const fromEmail = process.env.EMAIL_FROM || "mdahmede442@gmail.com";
module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRE,
  defaultAvatar,
  jwtActivationSecret,
  jwtActivationExpire,
  access_secret,
  access_expire,
  refresh_secret,
  refresh_expire,
  clientUrl,
  uploadDir,
  smtpHost,
  smtpPassword,
  smtpPort,
  smtpUsername,
  fromEmail,
};
