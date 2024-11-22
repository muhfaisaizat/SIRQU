'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('outlets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      position: {
        type: Sequelize.ENUM('Toko Utama', 'Toko Cabang'), // Menggunakan ENUM jika hanya ada beberapa pilihan
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true, // Bisa kosong, jika foto belum diunggah
      },
      syarat_ketentuan: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Nilai default 'false' jika belum diset
      },
      koordinator: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE // Kolom untuk soft delete
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('outlets');
  },
};
