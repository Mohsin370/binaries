const { Invoice } = require("../models");
const handleResponse = require("../helper/errorHandling");
import { Request, Response } from "express";

const getInvoice = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.order_id;
    const invoices = await Invoice.findAll({
      where: {
        order_id,
      },
    });
    handleResponse.handleSuccessResponse(
      invoices,
      res,
      "Invoice fetched successfully"
    );
  } catch (err) {
    console.log(err);
    handleResponse.handleErrorResponse(
      err,
      res,
      "Unable to fetch the invoices"
    );
  }
};

const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoice_data = req.body.data;
    const invoices = await Invoice.create(invoice_data);
    handleResponse.handleSuccessResponse(invoices, res, "Invoice created");
  } catch (err) {
    console.log(err);
    handleResponse.handleErrorResponse(
      err,
      res,
      "Unable to create the Invoice"
    );
  }
};

const updateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice_data = req.body.data;
    const invoice_id = req.params.id;
    const invoices = await Invoice.update(invoice_data, {
      where: {
        id: invoice_id,
      },
    });
    res.send({
      success: true,
      message: `Invoice Updated successfully`,
      invoices,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Unable to update the Invoice",
      err,
    });
  }
};

const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      handleResponse.handleErrorResponse("Error", res, "Invoice not found!");
      return;
    }
    invoice.destroy();
    handleResponse.handleSuccessResponse(
      "deleted",
      res,
      `Invoice ${req.params.id} deleted`
    );
  } catch (err) {
    console.log(err);
    handleResponse.handleErrorResponse(
      err,
      res,
      "Unable to delete the Invoice"
    );
  }
};

export { createInvoice, updateInvoice, deleteInvoice, getInvoice };
