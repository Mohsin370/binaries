const express = require("express");
const router = express.Router();
const roleController = require('../../controllers/role');



router.post("/", roleController.createRole);




module.exports = router;