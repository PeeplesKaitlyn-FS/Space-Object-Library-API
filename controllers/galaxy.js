const { Galaxy } = require('../db');

// Show all resources
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.render('views/galaxies/index.twig', { galaxies });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving galaxies' });
  }
}

// Show resource
const show = async (req, res) => {
  try {
    const id = req.params.id;
    const galaxy = await Galaxy.findByPk(id);
    if (!galaxy) {
      res.status(404).send({ message: 'Galaxy not found' });
      return;
    }
    res.render('views/galaxies/show.twig', { galaxy });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving galaxy' });
  }
}

// Create a new resource
const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    if (!name || !size || !description) {
      res.status(400).send({ message: 'Missing required fields' });
      return;
    }
    const galaxy = await Galaxy.create(req.body);
    res.redirect(`/galaxies/${galaxy.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating galaxy' });
  }
}

// Update an existing resource
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const galaxy = await Galaxy.findByPk(id);
    if (!galaxy) {
      res.status(404).send({ message: 'Galaxy not found' });
      return;
    }
    const { name, size, description } = req.body;
    if (!name || !size || !description) {
      res.status(400).send({ message: 'Missing required fields' });
      return;
    }
    galaxy.name = name;
    galaxy.size = size;
    galaxy.description = description;
    await galaxy.save();
    res.redirect(`/galaxies/${galaxy.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating galaxy' });
  }
}

// Remove a single resource
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const galaxy = await Galaxy.findByPk(id);
    if (!galaxy) {
      res.status(404).send({ message: 'Galaxy not found' });
      return;
    }
    await Galaxy.destroy({ where: { id } });
    res.redirect(`/galaxies`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting galaxy' });
  }
}

const form = async (req, res) => {
  try {
    if ('undefined' !== typeof req.params.id) {
      const galaxy = await Galaxy.findByPk(req.params.id);
      res.render('views/product/_form.twig', { galaxy });
    } else {
      res.render('views/product/_form.twig');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error rendering form' });
  }
}

module.exports = { index, show, create, update, remove, form }