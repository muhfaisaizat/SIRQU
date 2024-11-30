'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'struks', // Nama tabel struks
      [
        {
          name: 'Logo',
          status: 'false', 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Nama Toko',
          status: 'false',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alamat',
          status: 'false',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kontak',
          status: 'false',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sosial Media',
          status: 'false',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Catatan',
          status: 'false',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all struks
    await queryInterface.bulkDelete('struks', null, {});
  }
};
