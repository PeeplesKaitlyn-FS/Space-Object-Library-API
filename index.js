console.log('Application started');

// Load in Express framework
const express = require('express');

// Create a new Express instance called "app"
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const { Planet, Galaxy, Star, StarsPlanets } = require('./models');

app.use(express.json());

// Load in RESTful routers
const routers = require('./routers/index.js')
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

// Home page welcome middleware
app.get('/', (req, res) => {
  try {
    res.render('home/index');
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).json({ error: 'Error rendering home page' });
  }
});

// Galaxies page
app.get('/galaxies', async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll({
      attributes: ['id', 'name', 'size']
    });
    if (galaxies.length === 0) {
      res.render('galaxies/index', { message: 'No galaxies found' });
    } else {
      res.render('galaxies/index', { galaxies });
    }
  } catch (error) {
    console.error('Error fetching galaxies:', error);
    res.status(500).json({ error: 'Error fetching galaxies' });
  }
});

// Stars page
app.get('/stars', async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.render('stars/index', { stars });
  } catch (error) {
    console.error('Error fetching stars:', error);
    res.status(500).json({ error: 'Error fetching stars' });
  }
});

// Planets page
app.get('/planets', async (req, res) => {
  try {
    const planets = await Planet.findAll({
      attributes: ['id', 'name', 'size']
    });
    res.render('planets/index', { planets });
  } catch (error) {
    console.error('Error fetching planets:', error);
    res.status(500).json({ error: 'Error fetching planets' });
  }
});

// StarsPlanets page
app.get('/stars-planets', async (req, res) => {
  try {
    const starsPlanets = await StarsPlanets.findAll();
    res.render('stars-planets/index', { starsPlanets });
  } catch (error) {
    console.error('Error fetching stars-planets:', error);
    res.status(500).json({ error: 'Error fetching stars-planets' });
  }
});

// Register RESTful routers with "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)

// Set app to listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});