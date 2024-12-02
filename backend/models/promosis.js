const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan path ke konfigurasi database Anda

class Promosis extends Model {}

Promosis.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  namaPromosi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipeAktivasi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  minimalBeli: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nilaiKategori: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tanggalMulai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tanggalBerakhir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  jamMulai: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  jamBerakhir: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  pilihHari: {
    type: DataTypes.JSON, // Menggunakan JSON untuk array hari
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Promosi Aktif', 'Promosi Tidak Aktif'),
    allowNull: false,
    defaultValue: 'Promosi Aktif'
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
  modelName: 'promosis',
  tableName: 'promosis',
  timestamps: true,
  paranoid: true, // Mengaktifkan soft delete
});

module.exports = Promosis;
