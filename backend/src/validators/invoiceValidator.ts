const {getInvoiceSchema, createInvoiceSchema,updateInvoiceSchema, deleteInvoiceSchema} = require("../schemas/invoiceSchema");
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

const getInvoiceValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getInvoiceSchema.validateAsync(
      req.params
    );
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

const createInvoiceValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  await createInvoiceSchema.validateAsync(
      req.body.data
    );
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

const updateInvoiceValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateInvoiceSchema.validateAsync(req.body.data);
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

const deleteInvoiceValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteInvoiceSchema.validateAsync(req.params);
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
  getInvoiceValidation,
  createInvoiceValidation,
  updateInvoiceValidation,
  deleteInvoiceValidation,
};
