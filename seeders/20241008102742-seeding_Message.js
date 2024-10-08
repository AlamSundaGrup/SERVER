'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/message.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();

      return el;
    });
    await queryInterface.bulkInsert('Messages', data, {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {})
  }
};
