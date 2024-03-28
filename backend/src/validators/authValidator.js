const {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
} = require("../schemas/authSchema");

const loginValidation = async (req, res, next) => {
  try {
    const { value } = await loginSchema.validateAsync(req.body.data);

    req.value = value;
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.details[0].message,
    });
  }
};

const signupValidation = async (req, res, next) => {
  try {
    const { value } = await signupSchema.validateAsync(req.body.data);

    req.value = value;
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.details[0].message,
    });
  }
};

const forgotPasswordValidation = async (req, res, next) => {
  try {
    const { value } = await forgotPasswordSchema.validateAsync(req.body.data);
    req.value = value;
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.details[0].message,
    });
  }
};

module.exports = {
  loginValidation,
  signupValidation,
  forgotPasswordValidation,
};
