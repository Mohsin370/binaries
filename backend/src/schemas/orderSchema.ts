import Joi from "joi";

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
  id: Joi.number().required(),
});

export {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
};
