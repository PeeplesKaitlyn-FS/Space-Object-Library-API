// Load in Express framework
const express = require(`express`)


// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)


// Create a new Router instance and call it "router"
const router = express.Router()


// RESTful resource mappings
router.get(`/`, planetCtlr.index)
router.post(`/`, planetCtlr.create)
router.get(`/:id`, planetCtlr.show) 
router.put(`/:id`, planetCtlr.update) 
router.delete(`/:id`, planetCtlr.remove) 

//html5 specific routes
router.get(`/new`, planetCtlr.form)
router.get(`/:id/edit`, planetCtlr.form)
router.get(`/:id/delete`, planetCtlr.remove)
router.post(`/:id/`, planetCtlr.update)

// export "router"
module.exports = router