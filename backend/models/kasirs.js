// models/kasir.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Outlets = require('./outlets'); // Impor model Outlet
const Users = require('./users'); // Impor model User

class Kasirs extends Model {}

Kasirs.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usersId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Pastikan ini sesuai dengan nama tabel User Anda
            key: 'id',
        },
    },
    outletsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'outlets', // Pastikan ini sesuai dengan nama tabel Outlet Anda
            key: 'id',
        },
    },
    uangModal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    waktuBuka: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    waktuTutup: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    itemTerjual: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    totalKotor: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    totalBersih: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    }
}, {
    sequelize,
    modelName: 'kasirs',
    tableName: 'kasirs', // Pastikan ini sesuai dengan nama tabel Kasir Anda
    timestamps: true,
    paranoid: true, // Mengaktifkan soft delete
});

// Definisikan relasi
Kasirs.belongsTo(Outlets, { foreignKey: 'outletsId' });
Kasirs.belongsTo(Users, { foreignKey: 'usersId' });

module.exports = Kasirs;