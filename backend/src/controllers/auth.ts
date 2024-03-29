import { Request, Response } from "express";
var jwt = require("jsonwebtoken");
const { User, Role, UserRole } = require("../models");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
const { encryptPassword } = require("../helper/authHelper");
import  UserType from "../interfaces/user.interface";
import { sequelize } from "../models";
import { Transaction } from "sequelize";

interface tokenData {
  email: string;
  id: string;
  role_id: number;
}

interface mailOptions {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}

const checkExistingUser = async (email: string) => {
  const existingUser = await User.findAll({
    where: {
      email,
    },
    include: {
      association: "Roles",
      attributes: ["id"],
    },
  });
  if (existingUser.length > 0) {
    return existingUser;
  }
  return false;
};

const sendVerificationEmail = async (mailOptions: mailOptions) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.BINARIES_EMAIL,
      pass: process.env.BINARIES_PASSWORD,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const generateToken = (data: tokenData | string) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

const checkExistingRole = async (id: number) => {
  const role = await Role.findOne({
    where: {
      id,
    },
  });
  if (role) {
    return true;
  }
  return false;
};

const updateUserEmailVerification = async (token: string) => {
  return await User.update(
    {
      isEmail_verified: true,
    },
    {
      where: {
        verification_token: token,
      },
    }
  );
};

//verification email URL request to verify token and mark user as verified
const verifyEmailToken = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        verification_token: req.params.token,
      },
    });
    if (!user) {
      return sendResponse(res, false, "Invalid token");
    }
    const updated = await updateUserEmailVerification(req.params.token);
    if (updated) {
      res.redirect("/");
    }
  } catch (err) {
    handleError(err, res);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;
    const existingUser: UserType[] = await checkExistingUser(email);
    if (existingUser) {
      //password verification
      const isValidPassword = bcrypt.compareSync(
        password,
        existingUser[0].password
      );

      if (isValidPassword && existingUser[0].isEmail_verified) {
        var token = generateToken({
          email,
          id: existingUser[0].id,
          role_id: existingUser[0].Roles[0].id,
        }); //sign token using email
        const data = {
          token,
          email,
          id: existingUser[0].id,
        };
        sendResponse(res, true, "Login successful!", data);
      } else {
        sendResponse(res, false, "Invalid password or Pending verification");
      }
    } else {
      sendResponse(res, false, "User not found");
    }
  } catch (err) {
    handleError(err, res);
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role_id } = req.body.data;
    const existingUser = await checkExistingUser(email);
    let encryptedPassword = await encryptPassword(password);
    let existingRole = await checkExistingRole(role_id);

    if (!existingRole) {
      sendResponse(res, false, "This role does not exist!");
      return;
    }
    if (existingUser) {
      sendResponse(res, false, "User Already Exists");
      return;
    }
    const verification_token = generateToken(email);

    await sequelize.transaction(async (t: Transaction) => {  //user should not be created if the role is missing or failed to be created
      const newUser: UserType = await User.create(
        {
          name,
          email,
          password: encryptedPassword,
          verification_token,
        },
        { transaction: t }
      );

      if (newUser) {
        const userRole = await UserRole.create(
          {
            user_id: newUser.id,
            role_id,
          },
          { transaction: t }
        );
        if (!userRole) {
          console.log("UserRole was not created");
        }

        const mailOptions = {
          from: process.env.BINARIES_EMAIL,
          to: email,
          subject: "Email Verification",
          html: `<p>Welcome to Binnaries! <br>
                          <a href="${process.env.BACKEND_URL}/api/auth/verify/${verification_token}">
                          Please click this link to verify your email.</a></p>`,
        };

        await sendVerificationEmail(mailOptions);
        sendResponse(res, true, "User Created Successfully");
      }
    });
  } catch (err) {
    handleError(err, res);
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body.data;
    const existingUser = await checkExistingUser(email);
    if (!existingUser) {
      sendResponse(res, true, "Email does not exist!");
      return;
    }
    const user = existingUser[0];
    const verification_token = generateToken(email);
    if (!user) {
      res.send({
        message: "user not found",
      });
      return;
    }
    await user.update({
      verification_token,
    });

    const mailOptions = {
      from: process.env.BINARIES_EMAIL,
      to: email,
      subject: "Forgot Password for Binaries",
      html: `<p>Update Password!<br>
                        <a href="${process.env.BACKEND_URL}/api/auth/verify/${verification_token}">
                        Please click this link to verify your email.</a></p>`,
    };
    const sendEmail: boolean = await sendVerificationEmail(mailOptions);
    if (sendEmail) {
      sendResponse(res, true, `Email sent to ${user.email}`);
      return;
    } else if (!sendEmail) {
      sendResponse(res, false, `Unable to send email to ${user.email}`);
    }
  } catch (err) {
    console.log(err);
    handleError(err, res);
  }
};

const sendResponse = (
  res: Response,
  success: boolean,
  message: string,
  data: Record<string, any> = {}
) => {
  res.send({
    success,
    message,
    data,
  });
};

const handleError = (err: any, res: Response) => {
  sendResponse(res, false, "Error Reading request", err);
  console.error(err);
};

export { login, signup, verifyEmailToken, forgotPassword };
