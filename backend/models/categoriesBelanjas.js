const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan path ke konfigurasi database Anda

class CategoriesBelanjas extends Model {}

CategoriesBelanjas.init({
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
  name: {
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
  modelName: 'categoriesBelanjas',
  tableName: 'categoriesbelanjas',
  timestamps: true,
  paranoid: true, // Mengaktifkan soft delete
});

module.exports = CategoriesBelanjas;
