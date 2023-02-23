const express = require("express");
const router = express.Router();
const invoiceItemController = require("../../controllers/invoice_item");
const authMiddleware = require("../../middlewares/auth_middlware");
const invoiceItemValidaor = require("../../validators/invoiceItemValidator");

router.get(
  "/:invoice_id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("VIEW_INVOICE_ITEMS"),
  invoiceItemValidaor.getInvoiceItemValidation,
  invoiceItemController.getInvoiceItems
);
router.post(
  "/",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("CREATE_INVOICE_ITEMS"),
  invoiceItemValidaor.createInvoiceItemValidation,
  invoiceItemController.createInvoiceItems
);
router.put(
  "/:id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("UPDATE_INVOICE_ITEMS"),
  invoiceItemValidaor.updateInvoiceItemValidation,
  invoiceItemController.updateInvoiceItems
);
router.delete(
  "/:id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("DELETE_INVOICE_ITEMS"),
  invoiceItemValidaor.deleteInvoiceItemValidation,
  invoiceItemController.deleteInvoiceItems
);

module.exports = router;
