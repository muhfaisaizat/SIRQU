const argon2 = require('argon2'); // Import argon2 for password hashing
const User = require('../models/user'); // Pastikan model User diimpor

const seedRoles = async () => {
    try {
        // Hapus data yang ada
        await User.destroy({ where: {}, truncate: true });

        // Hash the passwords before saving them
        const adminPassword = await argon2.hash('Admin123');
        await User.create({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: adminPassword, // Simpan hashed password
            role: 'Admin',
            status: 'Active',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log('User admin created!');

        const managerPassword = await argon2.hash('Manager123');
        await User.create({
            name: 'Manager',
            email: 'manager@gmail.com',
            password: managerPassword, // Simpan hashed password
            role: 'Manager',
            status: 'Active',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log('User manager created!');

        const kasirPassword = await argon2.hash('Kasir123');
        await User.create({
            name: 'Kasir',
            email: 'kasir@gmail.com',
            password: kasirPassword, // Simpan hashed password
            role: 'Kasir',
            status: 'Active',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log('User kasir created!');
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
};

module.exports = seedRoles;
