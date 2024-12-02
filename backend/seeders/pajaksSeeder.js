'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'pajaks', // Nama tabel struks
      [
        {
          name: 'Pajak',
          nilaiPajak: 'null',
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Biaya Operasional',
          nilaiPajak: 'null',
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all struks
    await queryInterface.bulkDelete('pajaks', null, {});
  }
};
