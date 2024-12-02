const { Sequelize } = require('../db');
const db = require('../db');

const Galaxy = db.define(`galaxy`, {
  name: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

// Show all resources
const index = async (req, res) => {
  const galaxies = await Galaxy.findAll();
  res.render('views/galaxies/index.twig', { galaxies });
}

// Show resource
const show = async (req, res) => {
  const id = req.params.id;
  const galaxy = await Galaxy.findByPk(id);
  res.render('views/galaxies/show.twig', { galaxy });
}

// Create a new resource
const create = async (req, res) => {
  const galaxy = await Galaxy.create(req.body);
  res.redirect(302, `/galaxies/${galaxy.id}`);
}

// Update an existing resource
const update = async (req, res) => {
  const id = req.params.id;
  const galaxy = await Galaxy.findByPk(id);
  galaxy.name = req.body.name;
  galaxy.size = req.body.size;
  galaxy.description = req.body.description;
  await galaxy.save();
  res.redirect(302, `/galaxies/${galaxy.id}`);
}

// Remove a single resource
const remove = async (req, res) => {
  const id = req.params.id;
  await Galaxy.destroy({ where: { id } });
  res.redirect(302, `/galaxies`);
}

const form = async (req, res) => {
  if ('undefined' !== typeof req.params.id) {
    const galaxy = await Galaxy.findByPk(req.params.id);
    res.render('views/product/_form.twig', { galaxy });
  } else {
    res.render('views/product/_form.twig');
  }
}

module.exports = { index, show, create, update, remove, form }