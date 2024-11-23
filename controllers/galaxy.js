const express = require(`express`)
const router = express.Router()
const { Planet } = require(`../models/Galaxy`)
const bodyParser = require(`body-parser`)
const Joi = require('joi');
router.use(bodyParser.urlencoded({ extended: false }))


const planetSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required()
});


// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll(); 
    res.status(200).json(planets); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Show resource
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id); 
    if (!planet) {
      res.status(404).send('Planet not found');
    } else {
      res.status(200).json(planet); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Create a new resource
const create = async (req, res) => {
  try {
    const result = planetSchema.validate(req.body);
    if (result.error) {
      console.error('Validation error:', result.error);
      res.status(400).send({ message: 'Invalid request body', error: result.error.details });
    } else {
      const planet = await Planet.create(req.body); 
      res.status(201).json(planet); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Update an existing resource
const update = async (req, res) => {
  try {
    const result = planetSchema.validate(req.body);
    if (result.error) {
      console.error('Validation error:', result.error);
      res.status(400).send({ message: 'Invalid request body', error: result.error.details });
    } else {
      const planet = await Planet.findByPk(req.params.id); 
      if (!planet) {
        res.status(404).send('Planet not found');
      } else {
        planet.name = req.body.name;
        planet.description = req.body.description;
        await planet.save(); 
        res.status(200).json(planet);
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
    await Planet.destroy({ where: { id: req.params.id } }); 
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = { index, show, create, update, remove }