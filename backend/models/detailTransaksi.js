const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetailTransaksi = sequelize.define('DetailTransaksi', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transaksi_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'transaksis', // Nama tabel di database
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // Nama tabel di database
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'detail_transaksis', // Nama tabel di database
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
  paranoid: true // Mengaktifkan soft delete (deletedAt)
});

module.exports = DetailTransaksi;
