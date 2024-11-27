'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('planets', [
      {
        name: 'Earth',
        size: 'Small',
        description: 'The third planet from the Sun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mars',
        size: 'Small',
        description: 'The fourth planet from the Sun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jupiter',
        size: 'Large',
        description: 'The largest planet in our solar system',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('planets', null, {});
  }
};