const authHelper = require("../helper/authHelper");
const { Role, Permission } = require("../models");

const authorizeMiddleware = async (req, res, next) => {
  const token = req.header("token");
  if (token == null) {
    res.status(403).send({
      success: false,
      message: "Login required!",
    });
    return;
  }

  const user = await authHelper.tokenVerification(token);
  if (user) {
    // if (user.role_id != req.params.role_id) {
    //   res.status(401).send({
    //     success: false,
    //     message: "Invalid Role",
    //   });
    //   return;
    // }

    next();
  } else {
    res.status(401).send({
      success: false,
      message: "Inavlid token",
    });
  }
};

const getRole = async (role_id) => {
  const role = await Role.findByPk(role_id);
  if (role) {
    return role;
  }
  return false;
};

const authPermission = (requestedPermission) => {
  return async (req, res, next) => {
    try {
      const token = req.header("token");
      const { role_id } = await authHelper.tokenVerification(token);
      const { role_name } = await getRole(role_id);

      if (role_name == "ADMIN") {
        next();
        return;
      }
      const permissions = await Permission.findAll({
        include: [
          {
            association: "Roles",
            where: {
              id: role_id,
            },
          },
        ],
      });

      if (permissions.find((el) => el.permission_name == requestedPermission)) {
        next();
        return;
      } else {
        res.send({
          success: false,
          message: "Permission denied",
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        success: false,
        err,
        message: "Error authorizing Permission",
      });
    }
  };
};

module.exports = {
  authorizeMiddleware,
  authPermission,
};
