const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

// Validation for creating a transaction
const createTransactionValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    type: Joi.string().min(1).max(100).required(),
    amount: Joi.number().required(),
    date: Joi.date().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad request", error: error.details });
  }
  next();
};

// Validation for creating a category
const createCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string().min(1).max(100).required(),
    color: Joi.string().min(1).max(20).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad request", error: error.details });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
  createTransactionValidation,
  createCategoryValidation,
};
