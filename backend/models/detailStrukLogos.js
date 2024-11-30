'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DetailStrukLogo extends Model {}

DetailStrukLogo.init(
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
    logo: {
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
    modelName: 'detailStrukLogos',
    tableName: 'detailStrukLogos',
    timestamps: true,
    paranoid: true, // Enables soft delete (deletedAt)
  }
);

module.exports = DetailStrukLogo;
