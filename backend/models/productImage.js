// models/productImage.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

class ProductImage extends Model {}

ProductImage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products', // Pastikan nama model produk sesuai dengan yang ada
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
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
  modelName: 'ProductImage',
  tableName: 'product_image',
  timestamps: true,
  paranoid: true,
});

// Definisikan relasi
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(ProductImage, { foreignKey: 'product_id' });

module.exports = ProductImage;
