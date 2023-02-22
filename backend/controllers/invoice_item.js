const { InvoiceItems } = require("../models");

const getInvoiceItems = async (req, res) => {
  try {
    const invoice_items = await InvoiceItems.findAll({
      where: {
        invoice_id: req.params.invoice_id,
      },
    });
    res.send({
      success: true,
      message: `invoice_items Collected`,
      invoice_items,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Unable to fetch the invoice_item",
      err,
    });
  }
};

const createInvoiceItems = async (req, res) => {
  try {
    const invoice_item_data = req.body.data;
    const invoice_item = await InvoiceItems.create(invoice_item_data);
    res.send({
      success: true,
      message: `Invoice Item created successfully`,
      invoice_item,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Unable to create the Invoice",
      err,
    });
  }
};

const updateInvoiceItems = async (req, res) => {
  try {
    const invoice_item_data = req.body.data;
    const invoice_item_id = req.params.id;
    const invoice_item = await InvoiceItems.update(invoice_item_data, {
      where: {
        id: invoice_item_id,
      },
    });
    res.send({
      success: true,
      message: `Invoice item Updated successfully`,
      invoice_item,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Unable to update the Invoice item",
      err,
    });
  }
};

const deleteInvoiceItems = async (req, res) => {
  try {
    await InvoiceItems.delete(req.params.id);
    res.send({
      success: true,
      message: `Invoice item ${req.params.id} deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Unable to delete the Invoice item",
      err,
    });
  }
};

module.exports = {
  createInvoiceItems,
  updateInvoiceItems,
  deleteInvoiceItems,
  getInvoiceItems,
};
