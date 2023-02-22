const Joi = require("@hapi/joi");

const getOrderSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  role_id: Joi.number().required(),
});

const createOrderSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  name: Joi.string().min(2).max(35).required(),
  description: Joi.string().min(2).max(35),
  status: Joi.string().min(2).required(),
});

const updateOrderSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  order_id: Joi.number().required(),
  name: Joi.string().min(2).max(35).required(),
  description: Joi.string().min(2).max(35),
  status: Joi.string().min(2).required(),
});

const deleteOrderSchema = Joi.object({
  // user_id: Joi.string().uuid().required(),
  id: Joi.number().required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
};
