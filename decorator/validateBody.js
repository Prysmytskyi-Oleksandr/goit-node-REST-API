const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (reg, res, next) => {
    const { error } = schema.validate(reg.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
    }
    return func;
};

module.exports = validateBody;