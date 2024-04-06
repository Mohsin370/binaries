import Joi from "joi";

const getInvoiceSchema = Joi.object({
  order_id: Joi.number().required(),
});

const createInvoiceSchema = Joi.object({
  order_id: Joi.number().required(),
  total_quantity: Joi.number().required(),
  total_amount: Joi.number().required(),
  credit: Joi.number().max(10000000),
  description: Joi.string().min(2).max(255),
});

const updateInvoiceSchema = Joi.object({
  order_id: Joi.number().required(),
  total_quantity: Joi.number().required(),
  total_amount: Joi.number().required(),
  credit: Joi.number().max(10000000),
  description: Joi.string().min(2).max(255),
});

const deleteInvoiceSchema = Joi.object({
  id: Joi.number().required(),
});

export {
  getInvoiceSchema,
  createInvoiceSchema,
  updateInvoiceSchema,
  deleteInvoiceSchema,
};
