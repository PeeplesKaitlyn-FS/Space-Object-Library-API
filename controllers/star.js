const { Sequelize } = require('../db');
const db = require('../db');

const Star = db.define(`star`, {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

const starCtlr = {
  getAllStars: async (req, res) => {
    try {
      const stars = await Star.findAll({ raw: true });
      res.render('./stars/index.twig', { stars });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching stars' });
    }
  },
  createStar: async (req, res) => {
    try {
      const { name, description } = req.body;
      const star = await Star.create({ name, description });
      res.json(star);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error creating star' });
    }
  },
  getStar: async (req, res) => {
    try {
      const id = req.params.id;
      const star = await Star.findByPk(id);
      if (!star) {
        res.status(404).json({ message: 'Star not found' });
      } else {
        res.json(star);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching star' });
    }
  },
  updateStar: async (req, res) => {
    try {
      const id = req.params.id;
      const star = await Star.findByPk(id);
      if (!star) {
        res.status(404).json({ message: 'Star not found' });
      } else {
        star.name = req.body.name;
        star.description = req.body.description;
        await star.save();
        res.json(star);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error updating star' });
    }
  },
  deleteStar: async (req, res) => {
    try {
      const id = req.params.id;
      await Star.destroy({ where: { id } });
      res.json({ message: 'Star deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting star' });
    }
  },
  getStarForm: async (req, res) => {
    if ('undefined' !== typeof req.params.id) {
      const star = await Star.findByPk(req.params.id);
      if (!star) {
        res.status(404).json({ message: 'Star not found' });
      } else {
        res.render('views/product/_form.twig', { star });
      }
    } else {
      res.render('views/product/_form.twig');
    }
  }
};

module.exports = starCtlr;