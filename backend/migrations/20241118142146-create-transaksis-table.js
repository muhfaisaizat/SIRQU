'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat tabel 'product_outlets' sebagai junction table
    await queryInterface.createTable('transaksis', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true // Menentukan 'id' sebagai primary key
      },
      outletsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'outlets', // Referensi ke tabel outlets
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika outlet dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      kasirsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'kasirs', // Referensi ke tabel outlets
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika outlet dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Referensi ke tabel outlets
          key: 'id'
        },
        onDelete: 'CASCADE', // Jika outlet dihapus, hapus juga data di tabel junction
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      tipeOrder: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: 'Pelanggan',
        allowNull: false 
      },
      catatan: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      tipeBayar: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      ketBayar: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      subTotal: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bayar: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      kembalian: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('transaksis');
  }
};
