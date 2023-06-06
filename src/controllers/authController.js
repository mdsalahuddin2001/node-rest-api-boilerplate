const createError = require("http-errors");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, address } = req.body;

  // check if user already exists
  const userExists = await User.exists({ email });
  // throw error if user already exists
  if (userExists) {
    throw createError(409, "Already registered with this email.Please login.");
  }
  res.send({
    body: req.body,
    userExists,
  });
});

module.exports = { register };
