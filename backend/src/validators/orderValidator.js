const orderSchema = require("../schemas/orderSchema");
const handleResponse = require("../helper/errorHandling");

const getOrderValidation = async (req, res, next) => {
  try {
    const { value } = await orderSchema.getOrderSchema.validateAsync(
      req.params
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const createOrderValidation = async (req, res, next) => {
  try {
    const { value } = await orderSchema.createOrderSchema.validateAsync(
      req.body.data
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const updateOrderValidation = async (req, res, next) => {
  try {
    const { value } = await orderSchema.updateOrderSchema.validateAsync(
      req.body.data
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const deleteOrderValidation = async (req, res, next) => {
  try {
    const { value } = await orderSchema.deleteOrderSchema.validateAsync(
      req.params
    );
    req.value = value;
    next();
  } catch (error) {
    console.log(error)
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

module.exports = {
  getOrderValidation,
  createOrderValidation,
  updateOrderValidation,
  deleteOrderValidation,
};
