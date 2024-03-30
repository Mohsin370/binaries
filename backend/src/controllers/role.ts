const { Role } = require("../models");
import { Request, Response, response } from "express";
import RoleType from "../interfaces/role.interface";

const createRole = async (req: Request, res: Response) => {
  const role_name: string = req.body.data.role_name;
  const role: RoleType = await Role.create({
    role_name,
  });
  res.send({
    success: true,
    message: "Role created",
    role,
  });
};

const getRole = async (req: Request, res: Response) => {
  try {
    const roles: RoleType = await Role.findAll();
    res.send({
      success: true,
      message: "Role retrived successfully",
      roles,
    });
  } catch (error) {
    console.error("Error retriving roles:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the role",
    });
  }
};

const deleteRole = async (req: Request, res: Response) => {
  try {
    const role_id: number = req.body.data.role_id;
    if (role_id === 1) {
      res.status(401).send({
        success: false,
        message: "Cannot delete admin role from the system",
      });
      return;
    }

    const role = await Role.findByPk(role_id);
    if (!role) {
      res.status(404).send({
        success: false,
        message: "Role not found",
      });
      return;
    }

    await role.destroy();

    res.send({
      success: true,
      message: "Role deleted successfully",
      data: role,
    });
  } catch (err) {
    console.error("Error deleting role:", err);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the role",
    });
  }
};


const updateRole = async (req: Request, res: Response) => {
    try {
      const {role_id, role_name} = req.body.data;
      if (role_id === 1) {
        res.status(401).send({
          success: false,
          message: "Cannot update admin role from the system",
        });
        return;
      }
  
      const role = await Role.findByPk(role_id);
      if (!role) {
        res.status(404).send({
          success: false,
          message: "Role not found",
        });
        return;
      }
  
      await role.update({
        role_name
      });
  
      res.send({
        success: true,
        message: "Role updated successfully",
        data: role,
      });
    } catch (err) {
      console.error("Error updating role:", err);
      res.status(500).send({
        success: false,
        message: "An error occurred while updating the role",
      });
    }
  };


export { createRole, getRole, deleteRole, updateRole };
