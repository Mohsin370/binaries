import { Request, Response } from "express";
const { Orders } = require("../models");
const handleResponse = require("../helper/errorHandling");

const getOrders = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const orders = await Orders.findAll({
      where: {
        user_id,
      },
    });
    handleResponse.handleSuccessResponse(
      orders,
      res,
      "Orders feteched successfully"
    );
  } catch (err) {
    console.log(err);
    handleResponse.handleErrorResponse(err, res, "Unable to fetch the orders");
  }
};

const createOrders = async (req: Request, res: Response) => {
  try {
    const newOrder = await Orders.create(req.body.data);
    handleResponse.handleSuccessResponse(newOrder, res, "Order created");
  } catch (err) {
    handleResponse.handleErrorResponse(err, res, "Unable to create the order");
  }
};

const updateOrders = (req: Request, res: Response) => {};

const deleteOrders = async (req: Request, res: Response) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      handleResponse.handleErrorResponse("Error", res, "Order not found!");
      return;
    }
    order.destroy();
    handleResponse.handleSuccessResponse(
      "deleted",
      res,
      `Order ${req.params.id} deleted`
    );
  } catch (err) {
    console.log(err);
    handleResponse.handleErrorResponse(err, res, "Unable to delete the order");
  }
};

export {
  createOrders,
  updateOrders,
  deleteOrders,
  getOrders,
};
