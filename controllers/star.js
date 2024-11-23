const db = require('../models');
const { Star } = db;
module.exports = {
  index: async (req, res) => {
    const stars = await Star.findAll();
    res.json(stars);
  },
  create: async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const star = await Star.create({ name, description });
    res.json(star);
  },
  show: async (req, res) => {
    const id = req.params.id;
    const star = await Star.findByPk(id);
    res.json(star);
  },
  update: async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    await Star.update({ name, description }, { where: { id } });
    const star = await Star.findByPk(id);
    res.json(star);
  },
  remove: async (req, res) => {
    const id = req.params.id;
    await Star.destroy({ where: { id } });
    res.json({ message: 'Star deleted successfully' });
  }
}