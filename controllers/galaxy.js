const { Galaxy } = require(`../models`);

// Show all resources
const index = async (req, res) => {
  const products = await Galaxy.findAll();
  res.render('views/products/index.twig', { products });
}


// Show resource
const show = async (req, res) => {
  res.render('views/products/index.twig');
}


// Create a new resource
const create = async (req, res) => {
  res.render('views/products/index.twig');
}

// Update an existing resource
const update = async (req, res) => {
  res.status(200).json('product#update')
}


// Remove a single resource
const remove = async (req, res) => {
}
const form = (req, res) => {
  res.status(200).json('product#form(:id)')
}

module.exports = { index, show, create, update, remove, form }