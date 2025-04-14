'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.Category, {foreignKey: "categoryId"})
      Article.belongsTo(models.User, {foreignKey: "authorId"})
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Content is required"
        },
        notEmpty: {
          msg: "Content is required"
        }
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category Id is required"
        },
        notEmpty: {
          msg: "Category Id is required"
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Author Id is required"
        },
        notEmpty: {
          msg: "Author Id is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};