"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.hasMany(models.Invoice, {
        foreignKey: "order_id",
        onDelete: 'CASCADE',
      });
      models.Invoice.belongsTo(Orders, {
        foreignKey: "order_id",
      });
    }
  }
  Orders.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
