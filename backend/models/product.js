// models/Product.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unlimited_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Product',
  timestamps: true,
  paranoid: true,
});

// Definisikan relasi
Product.associate = (models) => {
  Product.belongsToMany(models.Category, {
    through: models.ProductCategory,
    foreignKey: 'product_id',
    otherKey: 'category_id',
  });
};

module.exports = Product;
