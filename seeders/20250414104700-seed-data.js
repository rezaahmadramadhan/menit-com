'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require("../data/user.json", "utf-8").map(el => {
      delete el.id,
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    const categories = require("../data/category.json", "utf-8").map(el => {
      delete el.id,
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    
    const articles = require("../data/article.json", "utf-8").map(el => {
      delete el.id,
      el.createdAt = el.updatedAt = new Date()
      return el
    })

   await queryInterface.bulkInsert("Users", users)
   await queryInterface.bulkInsert("Categories", categories)
   await queryInterface.bulkInsert("Articles", articles)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
