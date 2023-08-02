const Joi = require("joi");

// create product validation
const createProduct = {
  body: Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    summary: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().integer().required(),
  }),
};

module.exports = { createProduct };
