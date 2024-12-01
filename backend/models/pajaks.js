const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Pajaks extends Model {}

Pajaks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nilaiPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    },
  },
  {
    sequelize,
    modelName: 'Pajaks',
    tableName: 'pajaks',
    timestamps: true,
    paranoid: true, // Mengaktifkan soft delete
  }
);

module.exports = Pajaks;