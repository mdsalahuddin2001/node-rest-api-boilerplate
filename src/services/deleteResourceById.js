const createError = require("http-errors");
const deleteResourceById = async (Model, id, options = {}) => {
  // find user by id
  const resource = await Model.findByIdAndDelete(id);

  if (!resource) {
    throw createError(404, `${Model.modelName} not found`);
  }
  return resource;
};

module.exports = deleteResourceById;
