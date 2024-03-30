import express from "express";
const router = express.Router();
import { getUser, changePassword } from "../../controllers/user";
import {authorizeMiddleware} from "../../middlewares/auth_middlware"

router.get("/", getUser);
router.put(
  "/changePassword",
  authorizeMiddleware,
  changePassword
);

//should add delete route

export default router;
