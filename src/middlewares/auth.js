const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const asyncHandler = require("./asyncHandler");
const { access_secret } = require("../secret");
const User = require("../models/User");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return next(createError(401, "Not authorized to access this route"));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, access_secret);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(createError(401, "Not authorized to access this route"));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError(
          403,
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};
