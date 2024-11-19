'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kasirs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      outletsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'outlets', // Nama tabel outlets (pastikan sudah ada tabel ini)
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      usersId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nama tabel users (pastikan sudah ada tabel ini)
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      uangModal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      waktuBuka: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      waktuTutup: {
        type: Sequelize.DATE,
        allowNull: true, // Bisa bernilai NULL
      },
      itemTerjual: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // Awalnya isi 0
      },
      totalKotor: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0, // Awalnya isi 0
      },
      totalBersih: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0, // Awalnya isi 0
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
    await queryInterface.dropTable('kasirs');
  },
};
