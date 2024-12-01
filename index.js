// Load in our Express framework
const express = require(`express`)
// Create a new Express instance called "app"
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const { Planet } = require('./models');
// Load in our JSON parsing middleware
app.use(express.json());

// Load in our RESTful routers
const routers = require('./routers/index.js')
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

// Home page welcome middleware
app.get('/', async (req, res) => {
  const products = await Planet.findAll();
res.render('./products/index', { products });});

// Register our RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)


// Set our app to listen on port 3000
app.listen(3000)