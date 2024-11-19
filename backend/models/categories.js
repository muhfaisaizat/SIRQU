const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan path ini benar

class Categories extends Model {}

Categories.init({
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
    defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize, // Memastikan instance sequelize dari config/database.js digunakan
  modelName: 'categories',
  tableName: 'categories',
  timestamps: true,
  paranoid: true,
});

module.exports = Categories;
