'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat tabel 'outlets'
    await queryInterface.createTable('pajaks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true // Menentukan 'id' sebagai primary key
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      nilaiPajak: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false 
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
    await queryInterface.dropTable('pajaks');
  }
};
