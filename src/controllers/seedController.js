const data = require("../data");
const User = require("../models/User");
// @desc      seed users
// @route     GET /api/seed/users/
// @access    Private - [Admin]
const seedUsers = async (req, res, next) => {
  try {
    // delete all users
    await User.deleteMany({});
    // insert new demo users
    const users = await User.insertMany(data.users);

    res.status(201).json({
      message: "Users were seeded",
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUsers };
