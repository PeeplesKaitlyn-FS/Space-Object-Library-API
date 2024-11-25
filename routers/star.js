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
router.get(`/stars/:id`, starCtlr.show);
router.put(`/stars/:id`, starCtlr.update);
router.delete(`/stars/:id`, starCtlr.remove);

// export "router"
module.exports = router
