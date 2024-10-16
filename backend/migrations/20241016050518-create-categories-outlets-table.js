'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat tabel 'product_outlets' sebagai junction table
    await queryInterface.createTable('categories_outlets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true // Menentukan 'id' sebagai primary key
      },
      categories_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // Referensi ke tabel categories
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika product dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        allowNull: false // Tidak boleh null
      },
      outlet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'outlets', // Referensi ke tabel outlets
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika outlet dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        allowNull: false // Tidak boleh null
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Menghapus tabel 'product_outlets'
    await queryInterface.dropTable('product_outlets');
  }
};
