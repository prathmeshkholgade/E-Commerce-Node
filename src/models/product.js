'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      product.belongsTo(models.user, {
        foreignKey: "userId"
      })

      product.hasMany(models.Review, {
        foreignKey: "productId"
      })
      // define association here
    }
  }
  product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: { type: DataTypes.STRING, allowNull: false },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};