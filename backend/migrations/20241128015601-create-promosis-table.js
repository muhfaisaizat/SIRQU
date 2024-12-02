//create-promosis.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('promosis', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      namaPromosi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipeAktivasi: {
        type: Sequelize.ENUM('Otomatis', 'Manual'), // Menggunakan ENUM jika hanya ada beberapa pilihan
        allowNull: false
      },
      minimalBeli: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kategori: {
        type: Sequelize.ENUM('%', 'Rp'), // Menggunakan ENUM jika hanya ada beberapa pilihan
        allowNull: false
      },
      nilaiKategori: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tanggalMulai: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tanggalBerakhir: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      jamMulai: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      jamBerakhir: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      pilihHari: {
        type: Sequelize.JSON, // Menggunakan JSON untuk menyimpan array hari
        allowNull: false,
        defaultValue: [], // Default array kosong
      },
      status: {
        type: Sequelize.ENUM('Promosi Aktif', 'Promosi Tidak Aktif'),
        allowNull: false,
        defaultValue: 'Promosi Aktif'
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
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('promosis');
  },
};