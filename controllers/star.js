const express = require(`express`)
const { DataTypes } = require('sequelize');
const Star = require(`../models/Star`)(sequelize, DataTypes);
const router = express.Router()



router.get(`/`, async (req, res) => {
  const stars = await Star.findAll()
  res.json(stars)
})

router.post(`/`, async (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const star = await Star.create({ name, description })
  res.json(star)
})

router.get(`/:id`, async (req, res) => {
  const id = req.params.id
  const star = await Star.findByPk(id)
  res.json(star)
})

router.put(`/:id`, async (req, res) => {
  const id = req.params.id
  const star = await Star.findByPk(id)
  star.name = req.body.name
  star.description = req.body.description
  await star.save()
  res.json(star)
})

router.delete(`/:id`, async (req, res) => {
  const id = req.params.id
  await Star.destroy({ where: { id: id } })
  res.json({ message: "Star deleted successfully" })
})

module.exports = router