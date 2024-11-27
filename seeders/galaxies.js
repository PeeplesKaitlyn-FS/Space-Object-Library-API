module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingGalaxies = await queryInterface.sequelize.query(
      'SELECT name FROM galaxies'
    );

    const galaxiesToInsert = [
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
      },
      {
        name: 'Sombrero',
        size: 'Spiral',
        description: 'A large spiral galaxy in the constellation Virgo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pinwheel',
        size: 'Spiral',
        description: 'A large spiral galaxy in the constellation Ursa Major',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const galaxiesToInsertFiltered = galaxiesToInsert.filter(galaxy => {
      return !existingGalaxies[0].find(existingGalaxy => existingGalaxy.name === galaxy.name);
    });

    await queryInterface.bulkInsert('galaxies', galaxiesToInsertFiltered);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('galaxies', null, {});
  }
};