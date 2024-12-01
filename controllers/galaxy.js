const { Galaxy } = require(`../models`);

// Show all resources
const index = async (req, res) => {
  const products = await Galaxy.findAll();
  res.render('views/galaxies/index.twig', { products });
}

// Show resource
const show = async (req, res) => {
  res.render('views/galaxies/index.twig');
}

// Create a new resource
const create = async (req, res) => {
  const product = await Galaxy.create(req.body);
  res.redirect(302, `/galaxies/${product.id}`);
  res.render('views/galaxies/index.twig');
}

// Update an existing resource
const update = async (req, res) => {
  res.status(200).json('product#update')
}

// Remove a single resource
const remove = async (req, res) => {
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