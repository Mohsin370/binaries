const express = require("express");
const router = express.Router();
const productController = require('../../controllers/product');



router.get("/:user_id", productController.getProducts);




module.exports = router;