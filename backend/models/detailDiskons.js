const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetailDiskons = sequelize.define('detailDiskons', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transaksisId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'transaksis', // Sesuaikan dengan model Transaksi Anda
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  diskonsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'promosis', // Sesuaikan dengan model Product Anda
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: true
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
    type: DataTypes.DATE // Kolom untuk soft delete
  }
}, {
  modelName: 'detailDiskons',
  tableName: 'detaildiskons',
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
  paranoid: true // Mengaktifkan soft delete (deletedAt)
});

module.exports = DetailDiskons;
