'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat tabel 'product_outlets' sebagai junction table
    await queryInterface.createTable('product_outlets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true // Menentukan 'id' sebagai primary key
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products', // Referensi ke tabel products
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika product dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      outlet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'outlets', // Referensi ke tabel outlets
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika outlet dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Menghapus tabel 'product_outlets'
    await queryInterface.dropTable('product_outlets');
  }
};
