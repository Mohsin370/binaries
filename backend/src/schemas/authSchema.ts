import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().min(5).max(30).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const signupSchema = Joi.object({
  email: Joi.string().email().min(5).max(30).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  name: Joi.string().min(2).max(35).required(),
  role_id: Joi.number().max(35).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().min(5).max(30).required(),
});

export { loginSchema, signupSchema, forgotPasswordSchema };
