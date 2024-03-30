const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenVerification = async (token: string | undefined) => {
  try {

    if(!token){
      return null;
    }

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

// const encryptPassword = async (password: string): Promise<string> => {
//   let promise = new Promise((resolve, reject) => {
//     let saltRounds = 10;
//     bcrypt.genSalt(saltRounds, function (err: Error, salt: string) {
//       bcrypt.hash(password, salt, function (err: Error, hash: string) {
//         resolve(hash);
//       });
//     });
//   });
//   return promise.then((response) => {
//     return response;
//   });
// };


//updated version
const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Error encrypting password: ' + error);
  }
};

export {
  tokenVerification,
  encryptPassword
};
