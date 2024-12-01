// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)

// Create a new Router instance and call it "router"
const router = express.Router()

// RESTful resource mappings
router.get(`/`, starCtlr.index)
router.get(`/stars`, starCtlr.index);
router.post(`/stars`, starCtlr.create);
router.get(`/stars/:id(\d+)`, starCtlr.show);
router.put(`/stars/:id(\d+)`, starCtlr.update);
router.delete(`/stars/:id(\d+)`, starCtlr.remove);

//html5 specific routes
router.get(`/new`, starCtlr.form);
router.get(`/:id/edit`, starCtlr.form);
router.get(`/:id/delete`, starCtlr.remove);
router.post(`/:id/`, starCtlr.update);

// export "router"
module.exports = router