const Joi = require("joi");

function SignupValidation(obj) {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    userType: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(obj);
  return error;
}

module.exports = SignupValidation;
