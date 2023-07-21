const createError = require("http-errors");
const { errorResponse } = require("../utils/sendResponse");
const logger = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
  let error = { ...err, statusCode: err.statusCode };

  error.message = err.message;

  // Log to console for dev
  logger.log("error", error);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = createError(404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new createError(400, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new createError(400, message);
  }

  errorResponse(res, { statusCode: error.statusCode, message: error.message });
};

module.exports = errorHandler;
