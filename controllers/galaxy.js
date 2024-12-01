const { Sequelize } = require('../db');
const db = require('../db');

const Galaxy = db.define(`galaxy`, {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

// Show all resources
const index = async (req, res) => {
  const products = await Galaxy.findAll();
  res.render('views/galaxies/index.twig', { products });
}

// Show resource
const show = async (req, res) => {
  const id = req.params.id;
  const product = await Galaxy.findByPk(id);
  res.render('views/galaxies/index.twig', { product });
}

// Create a new resource
const create = async (req, res) => {
  const product = await Galaxy.create(req.body);
  res.redirect(302, `/galaxies/${product.id}`);
}

// Update an existing resource
const update = async (req, res) => {
  const id = req.params.id;
  const product = await Galaxy.findByPk(id);
  product.name = req.body.name;
  product.description = req.body.description;
  await product.save();
  res.redirect(302, `/galaxies/${product.id}`);
}

// Remove a single resource
const remove = async (req, res) => {
  const id = req.params.id;
  await Galaxy.destroy({ where: { id } });
  res.redirect(302, `/galaxies`);
}

const form = async (req, res) => {
  if ('undefined' !== typeof req.params.id) {
    const product = await Galaxy.findByPk(req.params.id);
    res.render('views/product/_form.twig', { product });
  } else {
    res.render('views/product/_form.twig');
  }
}

module.exports = { index, show, create, update, remove, form }