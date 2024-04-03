import { Request, Response, NextFunction } from "express";
import { tokenVerification } from "../helper/authHelper";
const { Permission } = require("../models");

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

  const user = await tokenVerification(token);
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
      const { role_id } = res.locals.user;

      if (role_id == 1) {
        //role_id 1 should always be admin or sysadmin etc
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
        res.status(403).send({
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
