const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan path ke konfigurasi database Anda

class Rekenings extends Model {}

Rekenings.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  namaPemilik: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  namaBank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomerRekening: {
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
  modelName: 'rekenings',
  tableName: 'rekenings',
  timestamps: true,
  paranoid: true, // Mengaktifkan soft delete
});

module.exports = Rekenings;
