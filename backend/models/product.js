// models/Product.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {
  static associate(models) {
    // Relasi dengan tabel productCategory
    Product.belongsToMany(models.Category, {
      through: models.ProductCategory,
      foreignKey: 'product_id',
      otherKey: 'category_id',
    });

    // Relasi dengan tabel productOutlet
    Product.belongsToMany(models.Outlet, {
      through: models.ProductOutlet,
      foreignKey: 'product_id',
      otherKey: 'outlet_id',
    });
  }
}

Product.init({
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
  modelName: 'Product',
  timestamps: true,
  paranoid: true,
});

// // Definisikan relasi
// Product.associate = (models) => {
//   Product.belongsToMany(models.Category, {
//     through: models.ProductCategory,
//     foreignKey: 'product_id',
//     otherKey: 'category_id',
//   });
// };

module.exports = Product;
