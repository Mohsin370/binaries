const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenVerification = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (user) {
      return user;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const encryptPassword = async (Password) => {
  let promise = new Promise((res, rej) => {
    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(Password, salt, function (err, hash) {
        res(hash);
      });
    });
  });
  return promise.then((res) => {
    return res;
  });
};

module.exports = {
  tokenVerification,
  encryptPassword
};
