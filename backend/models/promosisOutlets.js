const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PromosisOutlets extends Model {}

PromosisOutlets.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  promosisId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'promosis', // Ganti ini dengan nama tabel produk yang benar
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  outletsId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'outlets', // Ganti ini dengan nama tabel outlet yang benar
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
  modelName: 'promosisOutlets',
  tableName: 'promosisoutlets',
  timestamps: true,
  paranoid: true,
});

module.exports = PromosisOutlets;
