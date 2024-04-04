import {
  getInvoiceItemSchema,
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
  deleteInvoiceItemSchema,
} from "../schemas/invoiceItemSchema";

import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

const getInvoiceItemValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getInvoiceItemSchema.validateAsync(req.params);
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

const createInvoiceItemValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createInvoiceItemSchema.validateAsync(req.body.data);
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

const updateInvoiceItemValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateInvoiceItemSchema.validateAsync(req.body.data);
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

const deleteInvoiceItemValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteInvoiceItemSchema.validateAsync(req.params);
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
  getInvoiceItemValidation,
  createInvoiceItemValidation,
  updateInvoiceItemValidation,
  deleteInvoiceItemValidation,
};
