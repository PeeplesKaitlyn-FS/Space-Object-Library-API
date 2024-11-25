const express = require(`express`)
const { Galaxy } = require(`../models`);
const Joi = require('joi');


const galaxySchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required()
});


// Show all resources
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll(); 
    res.status(200).json(galaxies); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Show resource
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id); 
    if (!galaxy) {
      res.status(404).send('Galaxy not found');
    } else {
      res.status(200).json(galaxy); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Create a new resource
const create = async (req, res) => {
  try {
    const result = galaxySchema.validate(req.body);
    if (result.error) {
      console.error('Validation error:', result.error);
      res.status(400).send({ message: 'Invalid request body', error: result.error.details });
    } else {
      const existingGalaxy = await Galaxy.findOne({
        where: { name: req.body.name }
      });
      if (existingGalaxy) {
        res.status(400).send({ message: 'Galaxy with this name already exists' });
      } else {
        const galaxy = await Galaxy.create(req.body);
        res.status(201).json(galaxy);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Update an existing resource
const update = async (req, res) => {
  try {
    const result = galaxySchema.validate(req.body);
    if (result.error) {
      console.error('Validation error:', result.error);
      res.status(400).send({ message: 'Invalid request body', error: result.error.details });
    } else {
      const galaxy = await Galaxy.findByPk(req.params.id); 
      if (!galaxy) {
        res.status(404).send('Galaxy not found');
      } else {
        const existingGalaxy = await Galaxy.findOne({
          where: { name: req.body.name, description: req.body.description, id: { [Sequelize.Op.ne]: req.params.id } }
        });
        if (existingGalaxy) {
          res.status(400).send({ message: 'Galaxy with this name and description already exists' });
        } else {
          galaxy.name = req.body.name;
          galaxy.description = req.body.description;
          await galaxy.save(); 
          res.status(200).json(galaxy);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Remove a single resource
const remove = async (req, res) => {
  try {
    await Galaxy.destroy({ where: { id: req.params.id } }); 
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = { index, show, create, update, remove }