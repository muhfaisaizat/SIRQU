'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat tabel 'products'
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true // Menentukan 'id' sebagai primary key
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false // 'name' tidak boleh kosong
      },
      description: {
        type: Sequelize.TEXT // Deskripsi produk
      },
      price: {
        type: Sequelize.INTEGER // Harga produk
      },
      stock: {
        type: Sequelize.INTEGER // Stok produk
      },
      unlimited_stock: {
        type: Sequelize.BOOLEAN,
        defaultValue: false // Menentukan apakah stok tidak terbatas
      },
      status: {
        type: Sequelize.ENUM('Produk Aktif', 'Produk Tidak Aktif'),
        allowNull: false,
        defaultValue: 'Produk Aktif'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Nilai default untuk 'createdAt'
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // Memperbarui waktu saat data diubah
      },
      deletedAt: {
        type: Sequelize.DATE // Kolom untuk soft delete
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Menghapus tabel 'products'
    await queryInterface.dropTable('products');
    }
};