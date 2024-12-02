'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'detailStrukTekss', 
      [
        {
          struksId: 2, // ID untuk 'Nama Toko'
          text: 'null',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          struksId: 3, // ID untuk 'Alamat'
          text: 'null',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          struksId: 4, // ID untuk 'Kontak'
          text: 'null',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          struksId: 6, // ID untuk 'Catatan'
          text: 'null',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('detailStrukTekss', null, {});
  }
};
