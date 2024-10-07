// models/category.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    outletId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true, // enables soft delete
    tableName: 'Categories',
  });

  Category.associate = function(models) {
    // associations can be defined here
    // example: Category.belongsTo(models.Outlet, { foreignKey: 'outletId' });
  };

  return Category;
};
