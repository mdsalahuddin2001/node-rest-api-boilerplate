const createError = require("http-errors");
const crypto = require("crypto");
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
  clientUrl,
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

// @desc       Login
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

// @desc       Logout
// @route     POST /api/auth/logout
// @access    Private
const logout = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.refresh) return res.sendStatus(204); //No content
  res.clearCookie("refresh", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  successResponse(res, {});
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw createError(400, "Invalid email.");
  }
  // generate reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  // Create reset url
  const resetUrl = `${clientUrl}/auth/resetpassword?resettoken=${resetToken}`;

  const html = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({ email: user.email, html, subject: "Password Reset" });

    successResponse(res, {
      message: "password reset email was sent.",
      data: { resetUrl },
    });
    return;
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    throw createError(500, "Email could not be sent.Please try again later.");
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = req.query.resettoken.trim();
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw createError(400, "Invalid token");
  }

  // Set new password
  user.password = req.body.password;
  console.log("password", req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  successResponse(res, {
    message: "Password successfully reset. Please login with new password",
  });
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
module.exports = {
  register,
  activateAccount,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
