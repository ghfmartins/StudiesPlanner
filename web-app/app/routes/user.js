const express = require('express')
const router = express.Router()
const middleware = require('../controllers/middleware')
const userController = require('../controllers/user')

router.post('/', createUser)

router.put('/:id', middleware.authenticateByToken, updateUser)

module.exports = router

async function createUser(req, res) {
    try {
        let user = req.body
        user = await userController.createUser(user)
        res.status(201).send({"email": user.email, "x-key-api": user.auth.key, "x-token-api": user.auth.token})
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function updateUser(req, res) {
    try {
        await userController.updateUser(req.user, req.body)
        res.status(200).send('Usuário atualizado!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}
