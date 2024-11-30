const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Struk extends Model {}

Struk.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('true', 'false'),
      allowNull: false,
      defaultValue: 'true',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'struks',
    tableName: 'struks',
    timestamps: true,
    paranoid: true, // Enables soft delete (deletedAt)
  }
);

module.exports = Struk;
