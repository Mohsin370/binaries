import express from "express";
const router = express.Router();
import { createRole } from "../../controllers/role";
import {
  authorizeMiddleware,
  authPermission,
} from "../../middlewares/auth_middlware";

router.post(
  "/",
  authorizeMiddleware,
  authPermission("VIEW_PRODUCT"),
  createRole
);

//Note: Get, PUT, DELETE should be added later

export default router;
