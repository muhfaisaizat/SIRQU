const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetailPajaks = sequelize.define('detailPajaks', {
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
  pajaksId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pajaks', // Sesuaikan dengan model Product Anda
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
  modelName: 'detailPajaks',
  tableName: 'detailpajaks',
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
  paranoid: true // Mengaktifkan soft delete (deletedAt)
});

module.exports = DetailPajaks;
