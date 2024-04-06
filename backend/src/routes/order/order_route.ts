import express from "express";
const router = express.Router();
import {
  createOrders,
  getOrders,
  deleteOrders,
  updateOrders,
} from "../../controllers/order";
const {
  getOrderValidation,
  createOrderValidation,
  updateOrderValidation,
  deleteOrderValidation,
} = require("../../validators/orderValidator"); //NOTE: update validators
import {
  authorizeMiddleware,
  authPermission,
} from "../../middlewares/auth_middlware";

router.get(
  "/:user_id/:role_id",
  authorizeMiddleware,
  authPermission("VIEW_ORDER"),
  getOrderValidation,
  getOrders
);
router.post(
  "/",
  authorizeMiddleware,
  authPermission("CREATE_ORDER"),
  createOrderValidation,
  createOrders
);
router.put(
  "/:id",
  authorizeMiddleware,
  authPermission("UPDATE_ORDER"),
  updateOrderValidation,
  updateOrders
);
router.delete(
  "/:id",
  authorizeMiddleware,
  authPermission("DELETE_ORDER"),
  deleteOrderValidation,
  deleteOrders
);

export default router;
