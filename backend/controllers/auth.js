var jwt = require("jsonwebtoken");
const { User, Role, UserRole } = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const encryptPassword = async(Password) => {
    let promise = new Promise((res, rej) => {
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(Password, salt, function(err, hash) {
                res(hash);
            });
        });
    });
    return promise.then((res) => {
        return res;
    });
};

const checkExistingUser = async(email) => {
    const existingUser = await User.findAll({
        where: {
            email,
        },
        include:{
            association:'Roles',
            attributes:['id']
        }
    });
    if (existingUser.length > 0) {
        return existingUser;
    }
    return false;
};

const sendVerificationEmail = (user_email, verification_token) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.BINARIES_EMAIL,
            pass: process.env.BINARIES_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.BINARIES_EMAIL,
        to: user_email,
        subject: "Email Verification",
        html: `<p>Welcome to Binnaries! <br>
                <a href="http://${process.env.BACKEND_URL}/api/auth/verify/${verification_token}">
                Please click this link to verify your email.</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

const checkExistingRole = async(id) => {
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

const updateUserEmailVerification = async(token) => {
    return await User.update({
        isEmail_verified: true,
    }, {
        where: {
            verification_token: token,
        },
    });
};


//verification email URL request to verify token and mark user as verified
const verifyEmailToken = async(req, res) => {
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

const login = async(req, res) => {
    try {
        const { email, password } = req.body.data;
        const existingUser = await checkExistingUser(email);
        if (existingUser) {
            //password verification
            const isValidPassword = bcrypt.compareSync(
                password,
                existingUser[0].password
            );

            if (isValidPassword && existingUser[0].isEmail_verified) {
                var token = generateToken({email,id:existingUser[0].id, role_id:existingUser[0].Roles[0].id}); //sign token using email
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

const signup = async(req, res) => {
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

        const newUser = await User.create({
            name,
            email,
            password: encryptedPassword,
            verification_token,
        });

        if (newUser) {
            const userRole = await UserRole.create({
                user_id: newUser.id,
                role_id,
            });
            if (!userRole) {
                console.log("UserRole was not created");
            }
            sendVerificationEmail(email, verification_token);
            sendResponse(res, true, "User Created Successfully");
        }
    } catch (err) {
        handleError(err, res);
    }
};

const resetPassword = (req, res) => {};

const sendResponse = (res, success, message, data = {}) => {
    res.send({
        success,
        message,
        data,
    });
};

const handleError = (err, res) => {
    sendResponse(res, false, "Error Reading request");
    console.error(err);
};

module.exports = {
    login,
    signup,
    resetPassword,
    verifyEmailToken,
};