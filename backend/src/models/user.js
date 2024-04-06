'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here

            models.Role.belongsToMany(User, {
                through: models.UserRole,
                foreignKey: "role_id"
            });
            User.belongsToMany(models.Role, {
                through: models.UserRole,
                foreignKey: "user_id"
            });

            User.hasMany(models.Orders,{
                foreignKey:"user_id"
            });
            

            // User.hasMany(models.UserRole, {
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            //     foreignKey: "user_id",
            // });
            User.hasMany(models.Product, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                foreignKey: "created_by",
            })
        }
    }
    User.init({
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            isEmail: true,
            len: [7, 50],
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            len: [8, 20]
        },
        verification_token: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        isEmail_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};