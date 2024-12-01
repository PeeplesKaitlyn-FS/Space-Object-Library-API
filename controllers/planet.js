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
  index: async (req, res) => {
    const products = await Planet.findAll();
    res.render('views/planets/index.twig', { products });
  },
  create: async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const planet = await Planet.create({ name, description });
    res.json(planet);
  },
  show: async (req, res) => {
    const id = req.params.id;
    const planet = await Planet.findByPk(id);
    res.json(planet);
  },
  update: async (req, res) => {
    const id = req.params.id;
    const planet = await Planet.findByPk(id);
    planet.name = req.body.name;
    planet.description = req.body.description;
    await planet.save();
    res.json(planet);
  },
  remove: async (req, res) => {
    const id = req.params.id;
    await Planet.destroy({ where: { id } });
    res.json({ message: "Planet deleted successfully" });
  },
  form: async (req, res) => {
    if ('undefined' !== typeof req.params.id) {
      const product = await Planet.findByPk(req.params.id);
      res.render('views/product/_form.twig', { product });
    } else {
      res.render('views/product/_form.twig');
    }
  }
};