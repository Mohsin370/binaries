import express from "express";
const router = express.Router();
import {
  login,
  signup,
  verifyEmailToken,
  forgotPassword,
} from "../../controllers/auth";
import {
  loginValidation,
  signupValidation,
  forgotPasswordValidation,
} from "../../validators/authValidator";

router.get("/verify/:token", verifyEmailToken);
router.post("/", loginValidation, login);
router.put("/", signupValidation, signup);
router.put("/forgotPassword", forgotPasswordValidation, forgotPassword);

export default router;
