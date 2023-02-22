const invoiceItemSchema = require("../schemas/invoiceItemSchema");
const handleResponse = require("../helper/errorHandling");

const getInvoiceItemValidation = async (req, res, next) => {
  try {
    const { value } = await invoiceItemSchema.getInvoiceItemSchema.validateAsync(
      req.params
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const createInvoiceItemValidation = async (req, res, next) => {
  try {
    const { value } = await invoiceItemSchema.createInvoiceItemSchema.validateAsync(
      req.body.data
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const updateInvoiceItemValidation = async (req, res, next) => {
  try {
    const { value } = await invoiceItemSchema.updateInvoiceItemSchema.validateAsync(
      req.body.data
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const deleteInvoiceItemValidation = async (req, res, next) => {
  try {
    const { value } = await invoiceItemSchema.deleteInvoiceItemSchema.validateAsync(
      req.params
    );
    req.value = value;
    next();
  } catch (error) {
    console.log(error);
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

module.exports = {
  getInvoiceItemValidation,
  createInvoiceItemValidation,
  updateInvoiceItemValidation,
  deleteInvoiceItemValidation,
};
