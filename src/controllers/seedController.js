const data = require("../data");
const Product = require("../models/Product");
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
// @desc      seed products
// @route     GET /api/seed/products/
// @access    Private - [Admin]
const seedProducts = async (req, res, next) => {
  try {
    // delete all products
    await Product.deleteMany({});
    // insert new demo products
    const products = await Product.insertMany(data.products);

    res.status(201).json({
      message: "Products were seeded",
      products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUsers, seedProducts };
