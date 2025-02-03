const { Sequelize } = require('../db');
const db = require('../db');

const Planet = db.define(`planet`, {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

module.exports = {
  getAllPlanets: async (req, res) => {
    try {
      const planets = await Planet.findAll();
      res.render('views/planets/index.twig', { planets });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching planets' });
    }
  },
  createPlanet: async (req, res) => {
    try {
      const { name, description } = req.body;
      const planet = await Planet.create({ name, description });
      res.json(planet);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error creating planet' });
    }
  },
  getPlanet: async (req, res) => {
    try {
      const id = req.params.id;
      const planet = await Planet.findByPk(id);
      if (!planet) {
        res.status(404).json({ message: 'Planet not found' });
      } else {
        res.json(planet);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching planet' });
    }
  },
  updatePlanet: async (req, res) => {
    try {
      const id = req.params.id;
      const planet = await Planet.findByPk(id);
      if (!planet) {
        res.status(404).json({ message: 'Planet not found' });
      } else {
        planet.name = req.body.name;
        planet.description = req.body.description;
        await planet.save();
        res.json(planet);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error updating planet' });
    }
  },
  deletePlanet: async (req, res) => {
    try {
      const id = req.params.id;
      await Planet.destroy({ where: { id } });
      res.json({ message: 'Planet deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting planet' });
    }
  },
  getPlanetForm: async (req, res) => {
    if ('undefined' !== typeof req.params.id) {
      const planet = await Planet.findByPk(req.params.id);
      if (!planet) {
        res.status(404).json({ message: 'Planet not found' });
      } else {
        res.render('views/product/_form.twig', { planet });
      }
    } else {
      res.render('views/product/_form.twig');
    }
  }
};