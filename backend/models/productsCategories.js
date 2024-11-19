// models/productCategory.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductsCategories extends Model {}

ProductsCategories.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productsId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products', // Pastikan nama model produk sesuai dengan yang ada
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  categoriesId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories', // Pastikan nama model kategori sesuai dengan yang ada
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'productsCategories',
  tableName: 'productscategories',
  timestamps: true,
  paranoid: true,
});

module.exports = ProductsCategories;
