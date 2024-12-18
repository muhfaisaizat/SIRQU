// models/productImage.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Transaksis = require('./transaksis');

class UploadInvoices extends Model {}

UploadInvoices.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  transaksisId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'transaksis', // Pastikan nama model produk sesuai dengan yang ada
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  imageInvoice: {
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
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'uploadInvoices',
  tableName: 'uploadinvoices',
  timestamps: true,
  paranoid: true,
});

// Definisikan relasi
UploadInvoices.belongsTo(Transaksis, { foreignKey: 'transaksisId' });
Transaksis.hasMany(UploadInvoices, { foreignKey: 'transaksisId' });

module.exports = UploadInvoices;