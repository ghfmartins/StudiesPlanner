const express = require('express')
const router = express.Router()
const middleware = require('../controllers/middleware')
const lessonController = require('../controllers/lesson')

router.all('/*', middleware.authenticateByToken)

router.get('/', getAllLessons)

router.get('/:id', getLesson)

router.post('/', createLesson)

router.put('/:id', updateLesson)

router.delete('/:id', deleteLesson)

module.exports = router

async function getAllLessons(req, res) {
    try {
        let lessons = await lessonController.getAllUserLessons(req.user)
        res.status(200).send({ lessons: lessons })
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function getLesson(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let lesson = await lessonController.getUserLesson(user, id)
        res.status(200).send(lesson)
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function createLesson(req, res) {
    try {
        await lessonController.createLesson(req.user, req.body)
        res.status(201).send('Aula criada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function updateLesson(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let update = req.body
        await lessonController.updateLesson(user, id, update)
        res.status(200).send('Aula atualizada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function deleteLesson(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        await lessonController.deleteLesson(user, id)
        res.status(200).send('Aula deletada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}