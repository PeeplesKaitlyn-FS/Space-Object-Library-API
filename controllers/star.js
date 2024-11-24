const express = require('express');
const db = require('../models/index');
const Star = db.Star;

const starCtlr = {
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
    const star = await Star.findByPk(id);
    star.name = req.body.name;
    star.description = req.body.description;
    await star.save();
    res.json(star);
  },
  remove: async (req, res) => {
    const id = req.params.id;
    await Star.destroy({ where: { id: id } });
    res.json({ message: "Star deleted successfully" });
  }
};

module.exports = starCtlr;