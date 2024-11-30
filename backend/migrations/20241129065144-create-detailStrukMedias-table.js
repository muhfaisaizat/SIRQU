'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat tabel 'product_outlets' sebagai junction table
    await queryInterface.createTable('detailStrukMedias', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true // Menentukan 'id' sebagai primary key
      },
      struksId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'struks', 
          key: 'id'
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
        allowNull: false 
      },
      kategori: {
        type: Sequelize.ENUM('FB', 'IG', 'TW'),
        allowNull: false,
        defaultValue: 'FB'
      },
      nameMedia: {
        type: Sequelize.STRING,
        allowNull: false 
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
    await queryInterface.dropTable('detailStrukMedias');
  }
};
