'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('galaxies', [
      {
        name: 'Milky Way',
        size: 'Spiral',
        description: 'The galaxy that contains our solar system',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Andromeda',
        size: 'Spiral',
        description: 'The closest major galaxy to the Milky Way',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Triangulum',
        size: 'Spiral',
        description: 'A small spiral galaxy in the constellation Triangulum',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('galaxies', null, {});
  }
};