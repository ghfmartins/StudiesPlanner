const express = require('express')
const router = express.Router()
const middleware = require('../controllers/middleware')
const examController = require('../controllers/exam')

router.all('/*', middleware.authenticateByToken)

router.get('/', getAllExams)

router.get('/:id', getExam)

router.post('/', createExam)

router.put('/:id', updateExam)

router.delete('/:id', deleteExam)

module.exports = router

async function getAllExams(req, res) {
    try {
        let exams = await examController.getAllUserExams(req.user)
        res.status(200).send({ exams: exams })
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function getExam(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let exam = await examController.getUserExam(user, id)
        res.status(200).send(exam)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

async function createExam(req, res) {
    try {
        await examController.createExam(req.user, req.body)
        res.status(201).send('Prova criada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function updateExam(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let update = req.body
        await examController.updateExam(user, id, update)
        res.status(200).send('Prova atualizada!')
    } catch(error) {
        res.status(500).send(error.message)
    }
}

async function deleteExam(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        await examController.deleteExam(user, id)
        res.status(200).send('Prova deletada!')
    } catch(error) {
        res.status(500).send(error.message)
    }
}