'use strict';

const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

class Transaksi extends Model {
  static associate(models) {
    // Relasi dengan tabel outlets
    Transaksi.belongsTo(models.Outlet, {
      foreignKey: 'outlet_id',
      as: 'outlets',
    });

    // Relasi dengan tabel users (kasir)
    Transaksi.belongsTo(models.User, {
      foreignKey: 'kasir_id',
      as: 'users',
    });
  }

  // Getter method untuk format ID
  get formattedId() {
    return Number(this.id).toString().padStart(4, '0'); // Mengubah ID menjadi format 4 digit
  }
}

Transaksi.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  outlet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'outlets',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  kasir_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  tipe_order: {
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
  tipe_bayar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ket_bayar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sub_total: {
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
  modelName: 'Transaksi',
  timestamps: true,
  paranoid: true,
});




// Ekspor model Transaksi
module.exports = Transaksi;
