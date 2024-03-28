const invoiceSchema = require("../schemas/invoiceSchema");
const handleResponse = require("../helper/errorHandling");

const getInvoiceValidation = async (req, res, next) => {
  try {
    const { value } = await invoiceSchema.getInvoiceSchema.validateAsync(
      req.params
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const createInvoiceValidation = async (req, res, next) => {
  try {
  console.log("here");

    const { value } = await invoiceSchema.createInvoiceSchema.validateAsync(
      req.body.data
    );
  console.log("here2");

    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const updateInvoiceValidation = async (req, res, next) => {
  try {
    const { value } = await invoiceSchema.updateInvoiceSchema.validateAsync(
      req.body.data
    );
    req.value = value;
    next();
  } catch (error) {
    handleResponse.handleErrorResponse(error, res, error.details[0].message);
  }
};

const deleteInvoiceValidation = async (req, res, next) => {
  try {
    const { value } = await invoiceSchema.deleteInvoiceSchema.validateAsync(
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
  getInvoiceValidation,
  createInvoiceValidation,
  updateInvoiceValidation,
  deleteInvoiceValidation,
};
