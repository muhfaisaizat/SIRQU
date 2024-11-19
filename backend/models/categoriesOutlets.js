// models/categoryOutlet.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CategoriesOutlets extends Model {}

CategoriesOutlets.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoriesId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  outletsId: {
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
  modelName: 'categoriesOutlets',
  tableName: 'categoriesoutlets',
  timestamps: true,
  paranoid: true,
});

module.exports = CategoriesOutlets;
