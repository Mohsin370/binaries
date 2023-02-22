const { Role } = require('../models');


const createRole = async(req, res) => {

    const role_name = req.body.data.role_name;
    const role = await Role.create({
        role_name,
    });
    res.send({
        success: true,
        message: "Role created",
        role
    })
}



module.exports = {
    createRole
};