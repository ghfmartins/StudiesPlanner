const express = require('express')
const router = express.Router()
const middleware = require('../controllers/middleware')
const taskController = require('../controllers/task')

router.all('/*', middleware.authenticateByToken)

router.get('/', getAllTasks)

router.get('/:id', getTask)

router.post('/', createTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

router.put('/:id/realized', realizedTask)

module.exports = router

async function getAllTasks(req, res) {
    try {
        let tasks = await taskController.getAllUserTasks(req.user)
        res.status(200).send({ tasks: tasks })
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function getTask(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let task = await taskController.getUserTask(user, id)
        res.status(200).send(task)
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function createTask(req, res) {
    try {
        await taskController.createTask(req.user, req.body)
        res.status(201).send('Tarefa criada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function updateTask(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let update = req.body
        await taskController.updateTask(user, id, update)
        res.status(200).send('Tarefa atualizada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function deleteTask(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        await taskController.deleteTask(user, id)
        res.status(200).send('Tarefa deletada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function realizedTask(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        await taskController.realizedTask(user, id)
        res.status(200).send('Tarefa marcada como realizada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}