// models/categoryOutlet.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CategoryOutlet extends Model {}

CategoryOutlet.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categories_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  outlet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'outlets',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
 },
 updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
 },
 deletedAt: {
    type: DataTypes.DATE,
}
}, {
  sequelize,
  modelName: 'CategoryOutlet',
  tableName: 'categories_outlets',
  timestamps: true,
  paranoid: true,
});

module.exports = CategoryOutlet;
