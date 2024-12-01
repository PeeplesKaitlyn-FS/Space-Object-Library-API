// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)

// Create a new Router instance and call it "router"
const router = express.Router()

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index)
router.post(`/`, galaxyCtlr.create)
router.get(`/:id(\d+)`, galaxyCtlr.show) 
router.put(`/:id(\d+)`, galaxyCtlr.update) 
router.delete(`/:id(\d+)`, galaxyCtlr.remove) 

//html5 specific routes
router.get(`/new`, galaxyCtlr.form)
router.get(`/:id(\d+)/edit`, galaxyCtlr.form)
router.get(`/:id(\d+)/delete`, galaxyCtlr.remove)
router.post(`/:id(\d+)/`, galaxyCtlr.update)

// export "router"
module.exports = router