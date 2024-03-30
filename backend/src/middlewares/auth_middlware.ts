import { Request, Response, NextFunction } from "express";
const authHelper = require("../helper/authHelper");
const { Role, Permission } = require("../models");

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

  const user = await authHelper.tokenVerification(token);
  if (user) {
    //pass the email to the next function
    res.locals.user = user;
    next();
  } else {
    res.status(401).send({
      success: false,
      message: "Inavlid token",
    });
  }
};

const getRole = async (role_id: number) => {
  try {
    return await Role.findByPk(role_id);
  } catch (error) {
    throw new Error("Unable to find the role");
  }
};

const authPermission = (requestedPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("token");
      const { role_id } = await authHelper.tokenVerification(token);
      const { role_name } = await getRole(role_id);

      if (role_name == "admin") {
        next();
        return;
      }
      const permissions = await Permission.findAll({
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
        res.send({
          success: false,
          message: "Permission denied",
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        success: false,
        err,
        message: "Error authorizing Permission",
      });
    }
  };
};

export { authorizeMiddleware, authPermission };
