import express from "express";
const router = express.Router();
import {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../controllers/product";
import { authPermission, authorizeMiddleware } from "../../middlewares/auth_middlware";

router.get("/:user_id",authorizeMiddleware,authPermission("VIEW_PRODUCT"), getProducts);
router.post("/", authorizeMiddleware,authPermission("CREATE_PRODUCT"), createProduct);
router.put("/",authorizeMiddleware,authPermission("UPDATE_PRODUCT"), updateProduct);
router.delete("/",authorizeMiddleware,authPermission("DELETE_PRODUCT"), deleteProduct);

export default router;
