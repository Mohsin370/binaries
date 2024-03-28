const express = require("express");
const router = express.Router();
const authController = require('../../controllers/auth');
const authValidator = require ('../../validators/authValidator');


router.get("/verify/:token", authController.verifyEmailToken);
router.post("/", authValidator.loginValidation, authController.login);
router.put("/", authValidator.signupValidation, authController.signup);
router.put("/forgotPassword", authValidator.forgotPasswordValidation, authController.forgotPassword);




module.exports = router;