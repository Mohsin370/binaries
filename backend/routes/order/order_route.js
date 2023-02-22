const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order");
const orderValidator = require("../../validators/orderValidator");
const authMiddleware = require("../../middlewares/auth_middlware");

router.get(
  "/:user_id/:role_id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("VIEW_ORDER"),
  orderValidator.getOrderValidation,
  orderController.getOrders
);
router.post(
  "/",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("CREATE_ORDER"),
  orderValidator.createOrderValidation,
  orderController.createOrders
);
router.put(
  "/:id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("UPDATE_ORDER"),
  orderValidator.updateOrderValidation,
  orderController.updateOrders
);
router.delete(
  "/:id",
  authMiddleware.authorizeMiddleware,
  authMiddleware.authPermission("DELETE_ORDER"),
  orderValidator.deleteOrderValidation,
  orderController.deleteOrders
);

module.exports = router;
