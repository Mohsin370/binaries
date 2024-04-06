import express from "express";
const router = express.Router();
import {
  getPermission,
  createPermissions,
  updatePermissions,
  deletePermissions,
} from "../../controllers/permission";
import { authorizeMiddleware, isAdminOnly } from "../../middlewares/auth_middlware";

router.get("/", authorizeMiddleware, isAdminOnly, getPermission);
router.post("/", authorizeMiddleware, isAdminOnly, createPermissions);
router.put("/", authorizeMiddleware, isAdminOnly, updatePermissions);
router.delete("/", authorizeMiddleware, isAdminOnly, deletePermissions);

export default router;
