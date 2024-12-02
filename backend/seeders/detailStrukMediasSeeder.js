'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'detailStrukMedias', 
      [
        {
          struksId: 5, 
          kategori: 'FB',
          nameMedia: 'null',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          struksId: 5, 
          kategori: 'FB',
          nameMedia: 'null',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('detailStrukMedias', null, {});
  }
};
