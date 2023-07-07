const Joi = require("joi");
const createError = require("http-errors");
const pick = require("../utils/pick");
const { errorResponse } = require("../utils/sendResponse");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    const errorObj = error.details.reduce((acc, cur) => {
      if (!Object.hasOwn(acc, cur.context.key)) {
        acc[cur.context.key] = [];
      }
      acc[cur.context.key].push(cur.message);
      return acc;
    }, {});
    return errorResponse(res, {
      statusCode: 422,
      message: errorMessage,
      errorObj,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
