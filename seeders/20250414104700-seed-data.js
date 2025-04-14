'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataUser = require("../data/user.json", "utf-8").map(el => {
      delete el.id,
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    let dataCategory = require("../data/category.json", "utf-8").map(el => {
      delete el.id,
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    
    let dataCategory = require("../data/article.json", "utf-8").map(el => {
      delete el.id,
      el.createdAt = el.updatedAt = new Date()
      return el
    })

   await queryInterface.bulkInsert("")
   await queryInterface.bulkInsert("")
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
