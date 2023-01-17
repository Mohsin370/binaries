'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Role.hasMany(models.UserRole, {
            //     foreignKey: "role_id"
            // });
            Role.belongsToMany(models.Permission, {
                through: models.RolePermission,
                foreignKey: 'role_id'
            });
            models.Permission.belongsToMany(Role, {
                through: models.RolePermission,
                foreignKey: 'permission_id'
            })
        }
    }
    Role.init({
        role_name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};