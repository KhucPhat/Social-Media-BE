const Joi = require("joi");
const apiResponse = require("../utils/apiResponse");

exports.register = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .regex(/^[a-zA-ZÀ-ỹ ]+$/)
      .min(3)
      .max(30)
      .custom((value, helpers) => {
        if (/[^a-zA-ZÀ-ỹ ]/.test(value)) {
          return helpers.message("Tên không được chứa ký tự đặc biệt");
        }
        return value;
      })
      .required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const userData = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = schema.validate(userData);

  if (error) {
    return apiResponse.errorResponse(res, error.details[0].message);
  }

  next();
};

exports.login = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = schema.validate(userData);

  if (error) {
    return apiResponse.errorResponse(res, error.details[0].message);
  }

  next();
};

exports.dataEmail = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const dataEmail = {
    email: req.body.email,
  };

  const { error } = schema.validate(dataEmail);

  if (error) {
    return apiResponse.errorResponse(res, error.details[0].message);
  }

  next();
};

exports.dataPass = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
  });

  const dataPass = {
    password: req.body.new_password,
  };

  const { error } = schema.validate(dataPass);

  if (error) {
    return apiResponse.errorResponse(res, error.details[0].message);
  }

  next();
};

exports.changePass = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
  });

  const data = {
    password: req.body.password,
    new_password: req.body.new_password,
  };

  const { error } = schema.validate(data);

  if (error) {
    return apiResponse.errorResponse(res, error.details[0].message);
  }

  next();
};
