const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user");
const authMiddleware = require("../../middlewares/auth_middlware");

router.get("/", userController.getUser);
router.put(
  "/changePassword",
  authMiddleware.authorizeMiddleware,
  userController.changePassword
);

//should add delete route

module.exports = router;
