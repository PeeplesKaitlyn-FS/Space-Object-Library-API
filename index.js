// Load in our Express framework
const express = require(`express`)
// Create a new Express instance called "app"
const app = express()

const { Planet, Star, Galaxy } = require('./models');
// Load in our JSON parsing middleware
app.use(express.json());

// Load in our RESTful routers
const routers = require('./routers/index.js')
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

// Home page welcome middleware
app.get('/', async (req, res) => {
  const planets = await db.Planet.findByPk(3);
  res.render('home', { planets: planets });
});

app.get('/planets', async (req, res) => {
  const planets = await db.Planet.findAll();
  res.render('planets', { planets: planets });
}); 

app.get('/stars', async (req, res) => {
  const stars = await db.Star.findAll();
  res.render('stars', { stars: stars });
}); 

app.get('/galaxies', async (req, res) => {
  const galaxies = await db.Galaxy.findAll();
  res.render('galaxies', { galaxies: galaxies });
})

// Register our RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)


// Set our app to listen on port 3000
app.listen(3000)