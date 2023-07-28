const Joi = require("joi");

const createCategory = {
  body: Joi.object({
    name: Joi.string().required(),
    parentId: Joi.string(),
  }),
};

module.exports = { createCategory };
