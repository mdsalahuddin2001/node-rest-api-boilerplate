const Joi = require("joi");

const register = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required(),
    image: Joi.string(),
  }),
};

module.exports = { register };
