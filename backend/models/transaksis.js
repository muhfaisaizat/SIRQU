'use strict';

const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

class Transaksis extends Model {
  static associate(models) {
    // Relasi dengan tabel outlets
    Transaksis.belongsTo(models.outlets, {
      foreignKey: 'outletsId',
      as: 'outlets',
    });

    // Relasi dengan tabel users (kasir)
    Transaksis.belongsTo(models.outlets, {
      foreignKey: 'kasirsId',
      as: 'users',
    });
  }

  // Getter method untuk format ID
  get formattedId() {
    return Number(this.id).toString().padStart(4, '0'); // Mengubah ID menjadi format 4 digit
  }
}

Transaksis.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  outletsId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'outlets',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  kasirsId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'kasirs',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  tipeOrder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Pelanggan',
    allowNull: false,
  },
  catatan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipeBayar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ketBayar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subTotal: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  bayar: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  kembalian: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),  // Menggunakan Sequelize.literal
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),  // Menggunakan Sequelize.literal
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'transaksis',
  tableName: 'transaksis',
  timestamps: true,
  paranoid: true,
});

// Ekspor model Transaksi
module.exports = Transaksis;
