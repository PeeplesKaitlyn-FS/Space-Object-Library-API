const { Planet } = require(`../models/Planet`)
const db = require('../models/index');
const Planet = db.Planet;

module.exports = {
  index: async (req, res) => {
    const planets = await Planet.findAll()
    res.json(planets)
  },
  create: async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const planet = await Planet.create({name, description})
    res.json(planet)
  },
  show: async (req, res) => {
    const id = req.params.id
    const planet = await Planet.findByPk(id)
    res.json(planet)
  },
  update: async (req, res) => {
    const id = req.params.id
    const planet = await Planet.findByPk(id)
    planet.name = req.body.name
    planet.description = req.body.description
    await planet.save()
    res.json(planet)
  },
  remove: async (req, res) => {
    const id = req.params.id
    await Planet.destroy({ where: { id: id } })
    res.json({ message: "Planet deleted successfully" })
  }
}