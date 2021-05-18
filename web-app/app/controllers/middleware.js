const userRepository = require('../repositories/user')

module.exports.authenticateByToken = async function(req, res, next) {
    try {
        let key = req.headers['x-key-api']
        let token = req.headers['x-token-api']

        validateApiHeaders(key, token)

        let user = await userRepository.getByToken(token)
        if (!user) throw { code: 406, message: 'Usuário não encontrado para informações x-key-api e x-token-api passadas, por favor verifique a informação.' }

        req.user = user
        next()
    } catch(error) {
        console.error(`[authenticateByToken] Erro ao autenticar o token ${ req.headers['x-token-api'] } por chamada de API. ${error.message}`)
        if (error.code)
            res.status(error.code).send(error.message)
        else
            res.status(500).send('Erro interno do servidor.')
    }
}

function validateApiHeaders(key, token) {
    try {
        if (!key) throw { code: 400, message: 'É obrigatório passar o header x-key-api para acessar a API!' }
        if (key !== 'StudiesPlaner-HelperClass') throw { code: 400, message: 'Valor x-key-api passado não é o correto!' }
        if (!token) throw { code: 400, message: 'É obrigatório passar o header x-token-api para acessar a API!' }
    } catch(error) {
        throw error
    }
}
module.exports.validateApiHeaders = validateApiHeaders