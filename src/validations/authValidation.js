const Joi = require("joi");

const register = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { register };
