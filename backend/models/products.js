// models/Product.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Products extends Model {
  static associate(models) {
    // Relasi dengan tabel productCategory
    Products.belongsToMany(models.categories, {
      through: models.productsCategories,
      foreignKey: 'productsId',
      otherKey: 'categoriesId',
    });

    // Relasi dengan tabel productOutlet
    Products.belongsToMany(models.outlets, {
      through: models.productsOutlets,
      foreignKey: 'productsId',
      otherKey: 'outletsId',
    });

    // Relasi dengan tabel ProductOutlet
    Products.belongsToMany(models.productsOutlets, {
      through: models.productsOutlets,
      foreignKey: 'productsId',
      otherKey: 'outletsId',
    });
  }
}

Products.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unlimited_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM('Produk Aktif', 'Produk Tidak Aktif'),
    allowNull: false,
    defaultValue: 'Produk Aktif'
  },
}, {
  sequelize,
  modelName: 'products',
  tableName: 'products',
  timestamps: true,
  paranoid: true,
});

module.exports = Products;
