const {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
} = require("../schemas/authSchema");
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await loginSchema.validateAsync(req.body.data);
    next();
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }
  }
};

const signupValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await signupSchema.validateAsync(req.body.data);
    next();
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }
  }
};

const forgotPasswordValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await forgotPasswordSchema.validateAsync(req.body.data);
    next();
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }
  }
};

export {
  loginValidation,
  signupValidation,
  forgotPasswordValidation,
};
