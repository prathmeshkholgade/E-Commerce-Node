'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cart.hasMany(models.cartItem, {
        foreignKey: "cartId"
      }),
        cart.belongsTo(models.user, {
          foreignKey: "userId"
        });

      // define association here
    }
  }
  cart.init({
    userId: {
      type: DataTypes.INTEGER, allowNull: false, references: {
        model: "user",
        key: "id"
      }
    }
    ,
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};