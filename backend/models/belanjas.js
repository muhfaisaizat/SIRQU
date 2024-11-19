const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan path ke konfigurasi database Anda

class Belanjas extends Model {}

Belanjas.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  outletsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'outlets', // Referensi ke tabel outlets
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  categoriesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories', // Referensi ke tabel categories
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  namaKegiatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalBelanja: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  waktu: {
    type: DataTypes.TIME, // Menyimpan waktu (HH:mm:ss)
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY, // Menyimpan tanggal (YYYY-MM-DD)
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
  modelName: 'belanjas',
  tableName: 'belanjas',
  timestamps: true,
  paranoid: true, // Mengaktifkan soft delete
});

module.exports = Belanjas;
