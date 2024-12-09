// models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // sesuaikan path sesuai kebutuhan

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Manager', 'Kasir'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    // createdAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // },
    // updatedAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // },
    // deletedAt: {
    //     type: DataTypes.DATE,
    // },
    ResetPasswordToken: { // Field untuk menyimpan token reset password
        type: DataTypes.TEXT,
        allowNull: true
    },
    ResetTokenExpires: { // Field untuk menyimpan waktu kedaluwarsa token
        type: DataTypes.DATE,
        allowNull: true
    },
    tokenLogin: { // Field untuk menyimpan token reset password
        type: DataTypes.TEXT,
        allowNull: true
    },
    tokenLoginExpires: { // Field untuk menyimpan waktu kedaluwarsa token
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
    timestamps: true,
    paranoid: true
});

module.exports = User;
