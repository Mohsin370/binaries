const jwt = require("jsonwebtoken");

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

module.exports = {
  tokenVerification,
};
