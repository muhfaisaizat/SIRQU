'use strict';
const User = require('../models/users'); // Pastikan model User diimpor
const argon2 = require('argon2');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the passwords
    const adminPassword = await argon2.hash('Admin123');
    const managerPassword = await argon2.hash('Manager123');
    const kasirPassword = await argon2.hash('Kasir123');

    // Insert users into the database
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          email: 'admin@gmail.com',
          password: adminPassword, // Simpan hashed password
          role: 'Admin',
          status: 'Active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Manager',
          email: 'manager@gmail.com',
          password: managerPassword, // Simpan hashed password
          role: 'Manager',
          status: 'Active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kasir',
          email: 'kasir@gmail.com',
          password: kasirPassword, // Simpan hashed password
          role: 'Kasir',
          status: 'Active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all users
    await queryInterface.bulkDelete('Users', null, {});
  }
};
