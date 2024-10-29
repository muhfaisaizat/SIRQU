const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetailPajak = sequelize.define('DetailPajak', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transaksi_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Transaksis', // Sesuaikan dengan model Transaksi Anda
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  pajak_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pajaks', // Sesuaikan dengan model Product Anda
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
  tableName: 'detail_pajaks',
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
  paranoid: true // Mengaktifkan soft delete (deletedAt)
});

module.exports = DetailPajak;
