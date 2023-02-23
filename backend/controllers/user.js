const { User } = require("../models");
const { tokenVerification, encryptPassword } = require("../helper/authHelper");


const getUser = async (req, res) => {
  const users = await User.findAll();
  res.send({
    success: true,
    users,
  });
};

const changePassword = async (req, res) => {
  try {

    const { password } = req.body.data;
    const token = req.header('token');
    const email = await tokenVerification(token);
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const encryptedPassword = await encryptPassword(password);
    user.update({
      // needs to be fixed
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

module.exports = {
  getUser,
  changePassword
};
