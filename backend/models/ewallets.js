const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan path ke konfigurasi database Anda

class Ewallets extends Model {}

Ewallets.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  namaEwallet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  sequelize,
  modelName: 'ewallets',
  tableName: 'ewallets',
  timestamps: true,
  paranoid: true, // Mengaktifkan soft delete
});

module.exports = Ewallets;