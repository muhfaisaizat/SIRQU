// models/category.js
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Ganti dengan path yang sesuai ke konfigurasi database Anda

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'), // Menggunakan Sequelize.fn
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'), // Menggunakan Sequelize.fn
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  timestamps: true,
  paranoid: true, // Menambahkan fitur paranoid jika diperlukan
});

module.exports = Category;
