import { NextFunction, Request, Response } from "express";
import {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
} from "../schemas/orderSchema";
import { ValidationError } from "joi";

type OrderParam = {
  email: string;
  password: string;
};

const getOrderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getOrderSchema.validateAsync(req.params as OrderParam);
    next();
  }catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }
  } 
};

const createOrderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createOrderSchema.validateAsync(req.body.data);
    next();
  }catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }
  } 
};

const updateOrderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateOrderSchema.validateAsync(req.body.data);
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

const deleteOrderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteOrderSchema.validateAsync(req.params);
    next();
  }catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).send({
        success: false,
        message: error.details[0].message,
      });
    }
  } 
};

export {
  getOrderValidation,
  createOrderValidation,
  updateOrderValidation,
  deleteOrderValidation,
};
