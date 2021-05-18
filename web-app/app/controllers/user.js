const jwt = require('jwt-simple')
const userRepository = require('../repositories/user')

async function createUser(newUser) {
    try {
        validateUser(newUser)
        let user = newUser

        let token = jwt.encode(user.email, 'secrect.key.super..secret')
        user.auth = {
            key: 'StudiesPlaner-HelperClass',
            token: token
        }
        user.create = new Date()

        return await userRepository.create(user)
    } catch(error) {
        console.error(`[createUser] Erro ao criar User ${newUser.email}. ${error.message}`)
        throw error
    }
}
module.exports.createUser = createUser

function validateUser (user) {
    try {
        if (!user || !user.email) throw { code: 400, message: 'É obrigatório passar um email de usuário e senha para cadastro!' }
        if (!validateEmail(user.email)) throw { code: 400, message: 'É obrigatório passar um email válido para o usuário!' }
        if (!user.password) throw { code: 400, message: 'É obrigatório passar uma senha válida para o usuário!' }
    } catch(error) {
        throw error
    }
}
module.exports.validateUser = validateUser

function validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}
module.exports.validateEmail = validateEmail

async function updateUser(user, updateUser) {
    try {
        validateUpdate(updateUser)

        return userRepository.updateById(user._id, updateUser)
    } catch(error) {
        console.error(`[updateExam] Erro ao atualizar user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.updateUser = updateUser

function validateUpdate(update) {
    try {
        if (update.password) throw { code: 400, message: 'Não é possível atualizar a senha por essa rota de API!' }
        if (update.create) throw { code: 400, message: 'Não é possível atualizar a data de criação do usuário!' }
        if (update.auth) throw { code: 400, message: 'Não é possível atualizar as informações de autenticação do usuário!' }
    } catch(error) {
        throw error
    }
}
module.exports.validateUpdate = validateUpdate
