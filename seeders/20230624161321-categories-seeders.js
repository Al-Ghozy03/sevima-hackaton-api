"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Frontend",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Backend",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Data Science",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Physic",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "History",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Design",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Music",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Office",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Math",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "AI",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "UI & UX",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Digital Marketing",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Copy Writing",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        name: "Deep Learning",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
