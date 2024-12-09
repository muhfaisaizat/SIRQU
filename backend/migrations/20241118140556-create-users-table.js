'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true, // Bisa kosong, jika foto belum diunggah
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false // Tambahkan if necessary
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Tambahkan jika email harus unik
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false // Tambahkan if necessary
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Manager', 'Kasir'), // Menggunakan ENUM jika hanya ada beberapa pilihan
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true // Jika image opsional
      },
      ResetPasswordToken: {
        type: Sequelize.TEXT,
        allowNull: true // Menambahkan kolom untuk token reset password
      },
      ResetTokenExpires: {
        type: Sequelize.DATE,
        allowNull: true // Menambahkan kolom untuk tanggal kedaluwarsa token
      },
      tokenLogin: {
        type: Sequelize.TEXT,
        allowNull: true // Menambahkan kolom untuk token reset password
      },
      tokenLoginExpires: {
        type: Sequelize.DATE,
        allowNull: true // Menambahkan kolom untuk tanggal kedaluwarsa token
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Set default value to current date
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Set default value to current date
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
