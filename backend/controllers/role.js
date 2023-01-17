const { Role } = require('../models');


const createRole = async(req, res) => {

    const role = await Role.create({
        role_name: "customer",
    });
    res.send({
        success: true,
        message: "Role created"
    })
}



module.exports = {
    createRole
};