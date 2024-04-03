import express from "express";
const router = express.Router();
import {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../controllers/product";
import { authorizeMiddleware } from "../../middlewares/auth_middlware";

router.get("/:user_id",authorizeMiddleware, getProducts);
router.post("/", authorizeMiddleware, createProduct);
router.put("/",authorizeMiddleware, updateProduct);
router.delete("/",authorizeMiddleware, deleteProduct);

export default router;
