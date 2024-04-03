import express from "express";
const app = express();
import auth from './authentication/auth_route';
import role from "./role/role_route";
import user from "./user/user_route";
import products from "./product/product_route";
import invoice from "./order/invoice_route";
import invoice_item from "./order/invoice_item_route";
import order from "./order/order_route";
import permission from "./permission/permission_route";
/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Test endpoint
 *     description: Endpoint for testing purposes
 *     responses:
 *       '200':
 *         description: A successful response
 */
app.use("/auth", auth);
app.use("/role", role);
app.use("/user", user);
app.use("/product", products);
app.use("/order", order);
app.use("/invoice", invoice);
app.use("/invoiceItem", invoice_item);
app.use("/permission", permission);

export default app;