const { Product } = require("../models");
import { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  try {
    const user_id: string = req.params.user_id;
    const products = await Product.findAll({
      where: {
        created_by: user_id,
      },
    });
    res.send({
      success: true,
      message: "Products retrived",
      products,
    });
  } catch (error) {
    console.error("Error retriving products:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while retriving the products",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {

    //NOTE: Admin access is still pending for all the actions
    const product = await Product.findOne({
      created_by: res.locals.user.id,
      id: req.body.data.id,
    });
    if (!product) {
      res.status(404).send({
        success: false,
        message: "Product not found for this user",
      });
      return;
    }
    await product.destroy();

    res.send({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the products",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.update(req.body.data, {
      where: {
        created_by: req.body.data.user_id,
      },
    });
    if (!product) {
      res.status(404).send({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating products:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while updating the products",
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body.data);
    if (!product) {
      res.status(400).send({
        success: false,
        message: "Unable to create product",
      });
      return;
    }

    res.send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating products:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while creating the products",
    });
  }
};

export { getProducts, updateProduct, createProduct, deleteProduct };
