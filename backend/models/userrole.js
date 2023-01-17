'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // UserRole.belongsTo(models.User, {
            //     foreignKey: 'user_id'
            // });
            // UserRole.belongsTo(models.Role, {
            //     foreignKey: 'role_id'
            // });
            // UserRole.hasMany(models.Permission, {
            //     foreignKey: "role_id"
            // })

        }
    }
    UserRole.init({
        user_id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            required: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
        }
    }, {
        sequelize,
        modelName: 'UserRole',
    });
    return UserRole;
};