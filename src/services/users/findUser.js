const User = require("../../models/User");
const createError = require("http-errors");
const findUser = async (id) => {
  // find user by id
  const user = await User.findById(id);

  if (!user) {
    throw createError(404, "User not found");
  }
  return user;
};

module.exports = findUser;
