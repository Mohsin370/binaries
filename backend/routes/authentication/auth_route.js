const express = require("express");
const router = express.Router();
const authController = require('../../controllers/auth');


router.get("/verify/:token", authController.verifyEmailToken);
router.post("/", authController.login);
router.put("/", authController.signup);




module.exports = router;