const express = require("express");
const router = express.Router();
const invoiceController = require("../../controllers/invoice");
const authMiddleware = require("../../middlewares/auth_middlware");
const invoiceValidator = require("../../validators/invoiceValidator");

router.get(
  "/:order_id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("VIEW_INVOICE"),
  invoiceValidator.getInvoiceValidation,
  invoiceController.getInvoice
);
router.post(
  "/",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("CREATE_INVOICE"),
  invoiceValidator.createInvoiceValidation,
  invoiceController.createInvoice
);
router.put(
  "/:id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("UPDATE_INVOICE"),
  invoiceValidator.updateInvoiceValidation,
  invoiceController.updateInvoice
);
router.delete(
  "/:id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("DELETE_INVOICE"),
  invoiceValidator.deleteInvoiceValidation,
  invoiceController.deleteInvoice
);

module.exports = router;
