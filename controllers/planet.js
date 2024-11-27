const { Planet } = require('../models');

module.exports = {
  index: async (req, res) => {
    const products = await Planet.findAll();
    res.render('views/products/index.twig', { products });
  },
  create: async (req, res) => {
    res.render('views/products/index.twig');
    const name = req.body.name;
    const description = req.body.description;
    const planet = await Planet.create({ name, description });
    res.json(planet);
  },
  show: async (req, res) => {
    res.render('views/products/index.twig');
    const id = req.params.id;
    const planet = await Planet.findByPk(id);
    res.json(planet);
  },
  update: async (req, res) => {
    res.status(200).json('product#update');
    const id = req.params.id;
    const planet = await Planet.findByPk(id);
    planet.name = req.body.name;
    planet.description = req.body.description;
    await planet.save();
    res.json(planet);
  },
  remove: async (req, res) => {
    res.status(200).json('product#remove');
    const id = req.params.id;
    await Planet.destroy({ where: { id: id } });
    res.json({ message: "Planet deleted successfully" });
  },
  form: async (req, res) => {
    res.status(200).json('product#form(:id)');
  }
};
