const express = require(`express`)
const router = express.Router()
const { Quiz } = require(`../models`)
const bodyParser = require(`body-parser`)
router.use(bodyParser.urlencoded({ extended: false }))

router.get(`/`, async (req, res) => {
    const quizzes = await Quiz.findAll()
    res.json(quizzes)
})

router.post(`/`, async (req, res) => {
    //const { id,name } = req.body
    //quizzes.push({ 
     //   id: Number(id),
     //   name 
    //})
    const name = req.body.name
    const quiz =await Quiz.create({name})
    res.json(quizzes)
})

router.get(`/:id`, async (req, res) => {
    const id = req.params
    const quiz = quizzes.find(q => q.id == id)
    res.json(quiz)
})

router.post(`/:id`, async (req, res) => {
    const id = Number(req.params.id)
    quizzes.map((q) => {
        if (id === q.id) {
            q.name = req.body.name
        }
        return q
    })
    res.json(quizzes)
})

router.delete(`/:id`, async (req, res) => {
    const id = Number(req.params.id)
    quizzes = quizzes.filter(q => q.id !== id)
    res.json(quizzes)
})

module.exports = router