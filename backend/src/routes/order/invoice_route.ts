import  express  from "express";
import { getInvoice, createInvoice, updateInvoice, deleteInvoice } from "../../controllers/invoice";
import { authPermission, authorizeMiddleware } from "../../middlewares/auth_middlware";
import { getInvoiceValidation, createInvoiceValidation, updateInvoiceValidation, deleteInvoiceValidation } from "../../validators/invoiceValidator";
const router = express.Router();

router.get(
  "/:order_id",
  authorizeMiddleware,
  authPermission("VIEW_INVOICE"),
  getInvoiceValidation,
  getInvoice
);
router.post(
  "/",
  authorizeMiddleware,
  authPermission("CREATE_INVOICE"),
  createInvoiceValidation,
  createInvoice
);
router.put(
  "/:id",
  authorizeMiddleware,
  authPermission("UPDATE_INVOICE"),
  updateInvoiceValidation,
  updateInvoice
);
router.delete(
  "/:id",
  authorizeMiddleware,
  authPermission("DELETE_INVOICE"),
  deleteInvoiceValidation,
  deleteInvoice
);

export default router;
