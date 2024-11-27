const { Model } = require('sequelize');
const db = require('../models/index');
module.exports = {
  index: async (req, res) => {
    const products = await Planet.findAll();
    res.render('views/products/index.twig', { products });
    const planets = await db.Planet.findAll();
    res.json(planets);
  },
  create: async (req, res) => {
    res.render('views/products/index.twig');
    const name = req.body.name;
    const description = req.body.description;
    const planet = await db.Planet.create({ name, description });
    res.json(planet);
  },
  show: async (req, res) => {
    res.render('views/products/index.twig');
    const id = req.params.id;
    const planet = await db.Planet.findByPk(id);
    res.json(planet);
  },
  update: async (req, res) => {
    res.status(200).json('product#update');
    const id = req.params.id;
    const planet = await db.Planet.findByPk(id);
    planet.name = req.body.name;
    planet.description = req.body.description;
    await planet.save();
    res.json(planet);
  },
  remove: async (req, res) => {
    res.status(200).json('product#remove');
    const id = req.params.id;
    await db.Planet.destroy({ where: { id: id } });
    res.json({ message: "Planet deleted successfully" });
  },
  form: async (req, res) => {
    res.status(200).json('product#form(:id)');
  }
};
