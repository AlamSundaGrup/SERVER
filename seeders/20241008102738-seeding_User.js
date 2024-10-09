"use strict";
const { hashPassword } = require("../helpers/bycrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json");

    const hashedData = await Promise.all(
      data.map(async (el) => {
        el.password = await hashPassword(el.password);
        el.createdAt = el.updatedAt = new Date();
        return el;
      })
    );

    await queryInterface.bulkInsert("Users", hashedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
