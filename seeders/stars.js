'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stars', [
      {
        name: 'Sun',
        size: 100,
        description: 'The star at the center of our solar system',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sirius',
        size: 150,
        description: 'The brightest star in the night sky',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Betelgeuse',
        size: 200,
        description: 'A red supergiant star in the constellation Orion',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stars', null, {});
  }
};