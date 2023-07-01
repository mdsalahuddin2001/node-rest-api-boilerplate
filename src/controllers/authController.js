const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const { successResponse } = require("../utils/sendResponse");
const {
  jwtActivationSecret,
  jwtActivationExpire,
  access_secret,
  access_expire,
  refresh_secret,
  refresh_expire,
} = require("../secret");
const { createJWT } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");
const verifyEmail = require("../emails/verifyEmail");
// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, address, password } = req.body;

  // check if user already exists
  const userExists = await User.exists({ email });
  // throw error if user already exists
  if (userExists) {
    return next(
      createError(409, "Already registered with this email.Please login.")
    );
  }
  const token = createJWT(
    { name, email, password, phone, address },
    jwtActivationSecret,
    jwtActivationExpire
  );

  // await sendEmail({
  //   email,
  //   subject: "Email Verification",
  //   html: verifyEmail({ email }),
  // });

  successResponse(res, {
    statusCode: 200,
    data: { email, name, phone, address, token },
  });
});
// @desc      Verify user
// @route     POST /api/auth/verify
// @access    Public
const activateAccount = asyncHandler(async (req, res, next) => {
  // extract token from body
  const token = req.body.token;

  if (!token) throw createError(400, "Please provide a token");

  try {
    const decoded = jwt.verify(token, jwtActivationSecret);

    if (!decoded) throw createError(400, "Invalid token.");

    const userExists = await User.exists({ email: decoded.email });
    if (userExists) {
      throw createError(
        400,
        "User with this email already exists. Please login"
      );
    }
    await User.create(decoded);
    return successResponse(res, {
      statusCode: 201,
      message: "user registered successfully",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createError(400, "Token is expired.");
    } else if (error.name === "JsonWebTokenError") {
      throw createError(401, "Invalid token");
    } else {
      throw error;
    }
  }
});

// @desc      Admin Login
// @route     POST /api/v1/auth/admin-login
// @access    Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, "Please provide an email and password.");
  }
  // check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw createError(401, "Invalid credentials.");
  }
  // check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw createError(401, "Invalid credentials.");
  }
  sendTokenResponse(user, 200, res);
});

// Get token from mode, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create access token
  const accessToken = createJWT({ id: user._id }, access_secret, access_expire);
  const refreshToken = createJWT(
    { id: user._id },
    refresh_secret,
    refresh_expire
  );

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    secure: true, // https
    sameSite: "none", // cross-site cookie
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res
    .status(statusCode)
    .cookie("refresh", refreshToken, cookieOptions)
    .json({
      accessToken,
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });
};
module.exports = { register, activateAccount, login };
