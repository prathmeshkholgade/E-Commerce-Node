'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cartItem.belongsTo(models.cart, {
        foreignKey: "cartId"
      })
      cartItem.belongsTo(models.product, {
        foreignKey: "productId"
      })
      // define association here
    }
  }
  cartItem.init({
    cartId: { allowNull: false, type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'cartItem',
  });
  return cartItem;
};