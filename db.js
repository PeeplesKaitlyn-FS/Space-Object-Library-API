const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wdv442_space_tracker', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = sequelize;