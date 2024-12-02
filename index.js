console.log('Application started');

// Load in our Express framework
const express = require(`express`)
// Create a new Express instance called "app"
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const { Planet, Galaxy, Star } = require('./models');
// Load in our JSON parsing middleware
app.use(express.json());

// Load in our RESTful routers
const routers = require('./routers/index.js')
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

// Home page welcome middleware
app.get('/', (req, res) => {
  try {
    res.render('home/index');
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).send('Error rendering home page');
  }
});

// Galaxies page
app.get('/galaxies', async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll({
      attributes: ['id', 'name', 'size']
    });
    res.render('galaxies/index', { galaxies });
    console.log('Galaxies:', galaxies);
  } catch (error) {
    console.error('Error fetching galaxies:', error);
    res.status(500).send('Error fetching galaxies');
  }
});

// Stars page
app.get('/stars', async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.render('stars/index', { stars });
    console.log('Stars:', stars);
  } catch (error) {
    console.error('Error fetching stars:', error);
    res.status(500).send('Error fetching stars');
  }
});

// Planets page
app.get('/planets', async (req, res) => {
  try {
    const planets = await Planet.findAll({
      attributes: ['id', 'name', 'size']
    });
    res.render('planets/index', { planets });
    console.log('Planets:', planets);
  } catch (error) {
    console.error('Error fetching planets:', error);
    res.status(500).send('Error fetching planets');
  }
});

// Register our RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)

// Set our app to listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});