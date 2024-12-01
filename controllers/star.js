const { Star } = require('../models');

const starCtlr = {
  index: async (req, res) => {
    const products = await Star.findAll({ raw: true });
    res.render('./stars/index.twig', { products });
  },
  create: async (req, res) => {
    res.render('views/stars/index.twig');
    const name = req.body.name;
    const description = req.body.description;
    const star = await Star.create({ name, description });
    res.json(star);
  },
  show: async (req, res) => {
    res.render('views/stars/index.twig');
    const id = req.params.id;
    const star = await Star.findByPk(id);
    res.json(star);
  },
  update: async (req, res) => {
    res.status(200).json('product#update');
    const id = req.params.id;
    const star = await Star.findByPk(id);
    star.name = req.body.name;
    star.description = req.body.description;
    await star.save();
    res.json(star);
  },
  remove: async (req, res) => {
    res.status(200).json('product#remove');
    const id = req.params.id;
    await Star.destroy({ where: { id: id } });
    res.json({ message: "Star deleted successfully" });
  },
  form: async (req, res) => {
    if ('undefined' !== typeof req.params.id) {
      const product = await Star.findByPk(req.params.id);
      res.render('views/product/_form.twig', { product });
    } else {
      res.render('views/product/_form.twig');
    }
  }
};
module.exports = starCtlr;