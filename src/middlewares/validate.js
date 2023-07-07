const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  return res.json({ errors: error.details });
  return next();
};

module.exports = validate;
