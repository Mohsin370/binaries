const { Role } = require('../models');
import { Request, Response } from "express";


const createRole = async(req: Request, res: Response) => {

    const role_name: string = req.body.data.role_name;
    const role = await Role.create({
        role_name,
    });
    res.send({
        success: true,
        message: "Role created",
        role
    })
}



export {
    createRole
};