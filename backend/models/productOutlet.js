const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductOutlet extends Model {}

ProductOutlet.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products', // Ganti ini dengan nama tabel produk yang benar
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  outlet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'outlets', // Ganti ini dengan nama tabel outlet yang benar
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
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
    type: DataTypes.DATE,
  }
}, {
  sequelize,
  modelName: 'ProductOutlet',
  tableName: 'product_outlets',
  timestamps: true,
  paranoid: true,
});

module.exports = ProductOutlet;
