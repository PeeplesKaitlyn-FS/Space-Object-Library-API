const { Model } = require('sequelize');
const db = require('../models/index');
module.exports = {
  index: async (req, res) => {
    const planets = await db.Planet.findAll();
    res.json(planets);
  },
  create: async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const planet = await db.Planet.create({ name, description });
    res.json(planet);
  },
  show: async (req, res) => {
    const id = req.params.id;
    const planet = await db.Planet.findByPk(id);
    res.json(planet);
  },
  update: async (req, res) => {
    const id = req.params.id;
    const planet = await db.Planet.findByPk(id);
    planet.name = req.body.name;
    planet.description = req.body.description;
    await planet.save();
    res.json(planet);
  },
  remove: async (req, res) => {
    const id = req.params.id;
    await db.Planet.destroy({ where: { id: id } });
    res.json({ message: "Planet deleted successfully" });
  }
};