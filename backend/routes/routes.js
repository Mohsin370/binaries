const express = require("express");
const app = express();
const router = express.Router();
const auth = require('./authentication/auth_route');
const role = require("./role/role_route");
const user = require("./user/user_route");
const products = require("./product/product_route");

app.use("/auth", auth);
app.use("/role", role);
app.use("/user", user);
app.use("/product", products);


module.exports = app;