'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Permissions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Permission.belongsTo(models.Role, {
            //     foreignKey: "role_id"
            // });
        }
    }
    Permissions.init({
        permission_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'Permissions',
    });
    return Permissions;
};