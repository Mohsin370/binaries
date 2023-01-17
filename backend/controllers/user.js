const { User } = require("../models");


const getUser = async(req, res) => {
    const users = await User.findAll();
    res.send({
        success: true,
        users
    })
}


module.exports = {
    getUser
}