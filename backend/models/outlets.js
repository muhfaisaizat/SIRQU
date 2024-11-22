// models/outlet.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Outlet extends Model {}

Outlet.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    position: {
        type: DataTypes.ENUM('Toko Utama', 'Toko Cabang'),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    syarat_ketentuan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    koordinator: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    modelName: 'outlets',
    tableName: 'outlets',
    timestamps: true,
    paranoid: true, // Mengaktifkan soft delete (deletedAt)
});

module.exports = Outlet;
