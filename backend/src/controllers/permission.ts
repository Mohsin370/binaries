import { Request, Response } from "express";
const { Permissions } = require("../models");

const getPermission = async (req: Request, res: Response) => {
  try {
    const permissions = await Permissions.findAll();
    res.send({
      success: true,
      message: "Permissions retrived",
      permissions,
    });
  } catch (error) {
    console.error("Error retriving permissions:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while retriving the permissions",
    });
  }
};

const deletePermissions = async (req: Request, res: Response) => {
  try {
    const permission = await Permissions.findOne({
      id: req.body.data.id,
    });
    if (!permission) {
      res.status(404).send({
        success: false,
        message: "Permission not found!",
      });
      return;
    }
    await permission.destroy();

    res.send({
      success: true,
      message: "Permission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting permission:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the permission",
    });
  }
};

const updatePermissions = async (req: Request, res: Response) => {
  try {
    const permission = await Permissions.update(req.body.data, {
      where: {
        created_by: req.body.data.user_id,
      },
    });
    if (!permission) {
      res.status(404).send({
        success: false,
        message: "Permission not found",
      });
      return;
    }

    res.send({
      success: true,
      message: "permission updated successfully",
      permission,
    });
  } catch (error) {
    console.error("Error updating permissions:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while updating the permissions",
    });
  }
};

const createPermissions = async (req: Request, res: Response) => {
  try {
    const permission = await Permissions.create(req.body.data);
    if (!permission) {
      res.status(400).send({
        success: false,
        message: "Unable to create permission",
      });
      return;
    }

    res.send({
      success: true,
      message: "Permission created successfully",
      permission,
    });
  } catch (error) {
    console.error("Error creating permissions:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while creating the permissions",
    });
  }
};

export {
  getPermission,
  updatePermissions,
  createPermissions,
  deletePermissions,
};
