const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenVerification = async (token: string) => {
  try {
    if (!token) {
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

const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Error encrypting password: " + error);
  }
};

const verifyPassword = async (
  password: string,
  newPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compareSync(password, newPassword);

  return match;
};

export { tokenVerification, encryptPassword, verifyPassword };
