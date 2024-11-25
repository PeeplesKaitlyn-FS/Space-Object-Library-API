'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('wdv442_space_tracker.stars', [
      {
        name: 'Sun',
        size: 'Medium',
        description: 'The star at the center of our solar system',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sirius',
        size: 'Large',
        description: 'The brightest star in the night sky',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Betelgeuse',
        size: 'Red Supergiant',
        description: 'A red supergiant star in the constellation Orion',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wdv442_space_tracker.stars', null, {});
  }
};