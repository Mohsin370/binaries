import express from "express";
import {
  getInvoiceItems,
  createInvoiceItems,
  updateInvoiceItems,
  deleteInvoiceItems,
} from "../../controllers/invoice_item";
import {
  getInvoiceItemValidation,
  createInvoiceItemValidation,
  updateInvoiceItemValidation,
  deleteInvoiceItemValidation,
} from "../../validators/invoiceItemValidator";
import {
  authPermission,
  authorizeMiddleware,
} from "../../middlewares/auth_middlware";
const router = express.Router();

router.get(
  "/:invoice_id",
  authorizeMiddleware,
  authPermission("VIEW_INVOICE_ITEMS"),
  getInvoiceItemValidation,
  getInvoiceItems
);
router.post(
  "/",
  authorizeMiddleware,
  authPermission("CREATE_INVOICE_ITEMS"),
  createInvoiceItemValidation,
  createInvoiceItems
);
router.put(
  "/:id",
  authorizeMiddleware,
  authPermission("UPDATE_INVOICE_ITEMS"),
  updateInvoiceItemValidation,
  updateInvoiceItems
);
router.delete(
  "/:id",
  authorizeMiddleware,
  authPermission("DELETE_INVOICE_ITEMS"),
  deleteInvoiceItemValidation,
  deleteInvoiceItems
);

export default router;
