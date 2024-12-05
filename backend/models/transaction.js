// models/transaction.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Outlet = require('./outlets');

class Transaction extends Model {}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    outletsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Outlet,
            key: 'id',
        },
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
}, {
    sequelize,
    modelName: 'transactions',
    tableName: 'transactions',
    timestamps: true,
});

module.exports = Transaction;
