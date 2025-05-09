'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Article, {foreignKey: "categoryId"})
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category Name is required"
        },
        notEmpty: {
          msg: "Category Name is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};