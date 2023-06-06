const errorResponse = (
  res,
  { statusCode = 500, message = "Internal Server Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "success", data = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
module.exports = { errorResponse, successResponse };
