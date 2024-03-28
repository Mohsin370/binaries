"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models.InvoiceItems, {
        foreignKey: "invoice_id",
        onDelete: 'CASCADE',
      });
      models.InvoiceItems.belongsTo(Invoice, {
        foreignKey: "invoice_id",
      });
    }
  }
  Invoice.init(
    {
      description: DataTypes.STRING,

      order_id:{
        type: DataTypes.INTEGER,
        references: {
          model: "Orders",
          key: "order_id",
          type: "Foreign Key",
        },
      },

      total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      credit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
