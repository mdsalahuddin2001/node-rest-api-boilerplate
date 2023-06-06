const createError = require("http-errors");
const findResourceById = async (Model, id, options) => {
  // find user by id
  const resource = await Model.findById(id, options);

  if (!resource) {
    throw createError(404, `${Model.modelName} not found`);
  }
  return resource;
};

module.exports = findResourceById;
