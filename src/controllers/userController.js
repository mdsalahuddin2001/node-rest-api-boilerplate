const fs = require("fs");
const createError = require("http-errors");
const User = require("../models/User");
const { successResponse } = require("../utils/sendResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const { findResourceById, deleteResourceById } = require("../services");
const deleteImage = require("../utils/deleteImage");
// @desc      Get users
// @route     GET /api/users/
// @access    Private - [Admin]
const getUsers = asyncHandler(async (req, res, next) => {
  // extract query params
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  // build regex for search
  const searchRegExp = new RegExp(".*" + search + ".*", "i");

  // create filter object
  const filter = {
    role: { $ne: "admin" },
    $or: [
      { name: { $regex: searchRegExp } },
      { email: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } },
    ],
  };

  // create options
  const options = {};

  // query users
  const users = await User.find(filter, options)
    .limit(limit)
    .skip(limit * (page - 1));
  // count total query users
  const count = await User.find(filter).countDocuments();

  // send error response if no users found
  if (!users.length) {
    return next(createError(404, "No users found"));
  }
  // send success response
  successResponse(res, {
    data: {
      users,
      pagination: {
        totalCount: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    },
  });
});

// @desc      Get user
// @route     GET /api/users:id
// @access    Private - [Admin]
const getUser = asyncHandler(async (req, res, next) => {
  // find user by id
  const user = await findResourceById(User, req.params.id);
  // send response
  successResponse(res, {
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/users:id
// @access    Private - [Admin]
const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // find user by id
  const user = await findResourceById(User, id);
  // if user is an admin , prevent deletion
  if (user.role === "admin") {
    return next(createError(403, "Admin cannot be deleted"));
  }
  // user image also should be deleted
  const userImagePath = user?.image;
  // delete user image
  deleteImage(userImagePath);
  // delete user
  const deletedUser = await deleteResourceById(User, id);
  // send response
  successResponse(res, {
    message: "Successfully deleted the user!",
    data: deletedUser,
  });
});
module.exports = {
  getUsers,
  getUser,
  deleteUser,
};
