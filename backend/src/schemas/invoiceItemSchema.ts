import Joi from "joi";

const getInvoiceItemSchema = Joi.object({
  invoice_id: Joi.number().required(),
});

const createInvoiceItemSchema = Joi.object({
  invoice_id: Joi.number().required(),
  product_id: Joi.number().required(),
  unit_price: Joi.number().required(),
  total_amount: Joi.number().required(),
  description: Joi.string().min(2).max(255),
  currency: Joi.string().min(2).max(255),
});

const updateInvoiceItemSchema = Joi.object({
  invoice_id: Joi.number().required(),
  product_id: Joi.number().required(),
  total_quantity: Joi.number().required(),
  total_amount: Joi.number().required(),
  credit: Joi.string().min(2).max(35),
  description: Joi.string().min(2).max(255),
});

const deleteInvoiceItemSchema = Joi.object({
  id: Joi.number().required(),
});

export {
  getInvoiceItemSchema,
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
  deleteInvoiceItemSchema,
};
