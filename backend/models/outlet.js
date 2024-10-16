// models/outlet.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Outlet extends Model {}

Outlet.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Other outlet fields
}, {
  sequelize,
  modelName: 'Outlet',
  tableName: 'outlets',
  timestamps: true,
  paranoid: true,
});

module.exports = Outlet;
