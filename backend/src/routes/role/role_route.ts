import express from "express";
const router = express.Router();
import { createRole, getRole, deleteRole, updateRole } from "../../controllers/role";
import {
  authorizeMiddleware,
  authPermission,
} from "../../middlewares/auth_middlware";

router.post(
  "/",
  authorizeMiddleware,
  authPermission("CREATE_ROLE"),
  createRole
);
router.get(
    "/",
    authorizeMiddleware,
    authPermission("VIEW_ROLE"),
    getRole
);

router.delete(
    "/",
    authorizeMiddleware,
    authPermission("VIEW_ROLE"),
    deleteRole
);

router.put(
    "/",
    authorizeMiddleware,
    authPermission("UPDATE_ROLE"),
    updateRole
);

//Note: PUT should be added later

export default router;
