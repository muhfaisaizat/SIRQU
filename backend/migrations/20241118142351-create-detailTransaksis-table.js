'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat tabel 'outlets'
    await queryInterface.createTable('detailtransaksis', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true // Menentukan 'id' sebagai primary key
      },
      transaksisId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transaksis', // Referensi ke tabel categories
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika product dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        allowNull: false // Tidak boleh null
      },
      productsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products', // Referensi ke tabel categories
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika product dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        allowNull: false // Tidak boleh null
      },
      stok: {
        type: Sequelize.INTEGER,
        allowNull: false // 'name' tidak boleh kosong
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
    // Menghapus tabel 'outlets'
    await queryInterface.dropTable('detailtransaksis');
  }
};
