import express from "express";
const router = express.Router();
import {
  login,
  signup,
  verifyEmailToken,
  forgotPassword,
} from "../../controllers/auth";
import authValidator from "../../validators/authValidator";

router.get("/verify/:token", verifyEmailToken);
router.post("/", authValidator.loginValidation, login);
router.put("/", authValidator.signupValidation, signup);
router.put(
  "/forgotPassword",
  authValidator.forgotPasswordValidation,
  forgotPassword
);

export default router;
