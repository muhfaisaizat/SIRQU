// models/kasir.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Outlet = require('./outlet'); // Impor model Outlet
const User = require('./user'); // Impor model User

class Kasir extends Model {}

Kasir.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Pastikan ini sesuai dengan nama tabel User Anda
            key: 'id',
        },
    },
    outlet_id: {
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
    modelName: 'Kasir',
    tableName: 'kasirs', // Pastikan ini sesuai dengan nama tabel Kasir Anda
    timestamps: true,
    paranoid: true, // Mengaktifkan soft delete
});

// Definisikan relasi
Kasir.belongsTo(Outlet, { foreignKey: 'outlet_id' });
Kasir.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Kasir;