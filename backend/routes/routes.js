const express = require("express");
const app = express();
const router = express.Router();
const auth = require('./authentication/auth_route');
const role = require("./role/role_route");
const user = require("./user/user_route");
const products = require("./product/product_route");
const invoice = require("./order/invoice_route");
const invoice_item = require("./order/invoice_item_route");
const order = require("./order/order_route");

app.use("/auth", auth);
app.use("/role", role);
app.use("/user", user);
app.use("/product", products);
app.use("/order", order);
app.use("/invoice", invoice);
app.use("/invoiceItem", invoice_item);


module.exports = app;