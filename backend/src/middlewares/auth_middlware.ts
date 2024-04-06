import { Request, Response, NextFunction } from "express";
import { tokenVerification } from "../helper/authHelper";
import { tokenData } from "../interfaces/auth.interface";
import UserInterface from "../interfaces/user.interface";
import RoleInterface from "../interfaces/role.interface";
const { Permissions, Role, User } = require("../models");

const authorizeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");
  if (token == null) {
    res.status(403).send({
      success: false,
      message: "Login required!",
    });
    return;
  }

  const user: tokenData = await tokenVerification(token);
  if (user) {
    //store userData in request
    res.locals.user = user;
    next();
  } else {
    res.status(401).send({
      success: false,
      message: "Inavlid token",
    });
  }
};

const authPermission = (requestedPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role_name = await getRoleByUserID(req, res);
      if (!role_name) {
        res.status(401).send({
          success: false,
          message: "Invalid Role Received!",
        });
        return;
      }

      const { role_id } = res.locals.user;
      if (role_name === "admin") {
        next();
        return;
      }
      const permissions = await Permissions.findAll({
        include: [
          {
            association: "Roles",
            where: {
              id: role_id,
            },
          },
        ],
      });

      if (
        permissions.find((el: any) => el.permission_name == requestedPermission)
      ) {
        next();
        return;
      } else {
        res.status(403).send({
          success: false,
          message: "Permission denied",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        err,
        message: "Internal Server Error",
      });
    }
  };
};

const getRoleByUserID = async (
  req: Request,
  res: Response
): Promise<string | boolean> => {
  try {
    const { email, role_id } = res.locals.user;

    const user: UserInterface = await User.findOne({
      where: {
        email,
      },
      include: {
        association: "Roles",
      },
    });

    const role = await user.Roles.find((role) => role.id === role_id); //Verify if the claim role for user is actually same in database
    if (role) {
      return role.role_name;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const isAdminOnly = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role_name = await getRoleByUserID(req, res);
    if (!role_name) {
      res.status(401).send({
        success: false,
        message: "Invalid Role Received!",
      });
      return;
    }

    if (role_name == "admin") {
      next();
      return;
    } else {
      res.status(403).send({
        success: false,
        message: "Only admin can manage this module!",
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Internal Server Error",
    });
  }
};

export { authorizeMiddleware, authPermission, isAdminOnly };
