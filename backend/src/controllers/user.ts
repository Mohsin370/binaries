import { Request, Response } from "express";
const { User } = require("../models");
import { encryptPassword, verifyPassword } from "../helper/authHelper";
import UserInterface from "../interfaces/user.interface";

//Note: needs to be added pagination if getting all the user
const getUser = async (req: Request, res: Response) => {
  try {
    User.findAll({
      attributes: { exclude: ["password"] },
    }).then((users: UserInterface[]) => {
      res.send({
        success: true,
        users,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { password, newPassword } = req.body.data;
    // const token = req.header("token");
    const { email } = res.locals.user;
    if (!email) {
      res.status(401).send({
        success: false,
        message: "User Verification Failed",
      });
      return;
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });


    const isMatch: boolean = await verifyPassword(password, user[0].password);

    if(!isMatch){
      res.status(403).send({
        success: false,
        message: "Current password is inavlid"
      });
      return;
    }

    const encryptedPassword: string = await encryptPassword(newPassword);
    user.update({
      password: encryptedPassword,
    });
    res.send({
      success: true,
      message: "Password Updated",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      err,
      message: "Unable to change Password",
    });
  }
};

export { getUser, changePassword };
