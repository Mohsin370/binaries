const express = require("express");
const router = express.Router();
const invoiceItemController = require('../../controllers/invoice_item');
const invoiceItemValidaor = require('../../validators/invoiceItemValidator');

router.get("/:invoice_id",invoiceItemValidaor.getInvoiceItemValidation, invoiceItemController.getInvoiceItems);
router.post("/",invoiceItemValidaor.createInvoiceItemValidation, invoiceItemController.createInvoiceItems);
router.put("/:id",invoiceItemValidaor.updateInvoiceItemValidation, invoiceItemController.updateInvoiceItems);
router.delete("/:id",invoiceItemValidaor.deleteInvoiceItemValidation, invoiceItemController.deleteInvoiceItems);




module.exports = router;