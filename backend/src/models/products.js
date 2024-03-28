'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Products.belongsTo(models.InvoiceItems,{
                foreignKey:"id"
            })
        }
    }
    Products.init({
        name: {
            type:DataTypes.STRING,
        },
        specification: {
            type: DataTypes.STRING,
        },
        model_name:{
            type: DataTypes.STRING,
        },
        category:{
            type:DataTypes.STRING
        },

        description: DataTypes.STRING,
        created_by: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            required: true,
        },
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Products;
};