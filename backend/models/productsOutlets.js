const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductsOutlets extends Model {
  static associate(models) {
    ProductsOutlets.belongsTo(models.products, {
      foreignKey: 'productsId',
    });
    ProductsOutlets.belongsTo(models.outlets, {
      foreignKey: 'outletsId',
    });
  }
}

ProductsOutlets.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productsId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products', // Ganti ini dengan nama tabel produk yang benar
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  outletsId: {
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
  modelName: 'productsOutlets',
  tableName: 'productsoutlets',
  timestamps: true,
  paranoid: true,
});

module.exports = ProductsOutlets;
