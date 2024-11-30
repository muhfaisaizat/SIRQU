'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DetailStrukTeks extends Model {}

DetailStrukTeks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    struksId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'struks',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'detailStrukTekss',
    tableName: 'detailStrukTekss',
    timestamps: true,
    paranoid: true, // Enables soft delete (deletedAt)
  }
);

module.exports = DetailStrukTeks;
