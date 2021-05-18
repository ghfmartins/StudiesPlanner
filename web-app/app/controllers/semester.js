const semesterRepository = require('../repositories/semester')


async function createSemester(user, newSemester) {
    try {
        validateSemester(newSemester)

        let semester = newSemester
        semester.author = user._id
        semester.create = new Date()

        return await semesterRepository.create(semester)
    } catch(error) {
        console.error(`[createSemester] Erro ao criar semester para o user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.createSemester = createSemester

function validateSemester(semester) {
    try {
        if (!semester || Object.keys(semester).length == 0) throw { code: 400, message: 'É obrigatório passar um período para ser salvo!' }
        if (!semester.name) throw { code: 400, message: 'É obrigatório passar um(a) nome/identificação do período!' }
        if (!semester.startDate) throw { code: 400, message: 'É obrigatório passar a data de início do período!' }
        if (!semester.endDate) throw { code: 400, message: 'É obrigatório passar a data de término do período!' }

        validateDate(semester)
    } catch(error) {
        throw error
    }
}
module.exports.validateSemester = validateSemester

function validateDate(semester) {
    try {
        let startDate = new Date(semester.startDate)
        let endDate = new Date(semester.endDate)

        if (startDate > endDate)
            throw { code: 400, message: 'A data de início do período deve ser menor que a data de término!' }

        semester.startDate = startDate
        semester.endDate = endDate
    } catch(error) {
        throw error
    }
}
module.exports.validateDate = validateDate

async function getAllUserSemesters(user) {
    try {
        let semesters = await semesterRepository.get({ 'author': user._id })
        return semesters
    } catch(error) {
        console.error(`[getAllUserSemesters] Erro ao buscar semesters do user ${user._id} - ${user.email}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getAllUserSemesters = getAllUserSemesters

async function getUserSemester(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para buscar um período específico!' }

        let semester = await semesterRepository.getById(user._id, id)
        return semester
    } catch(error) {
        console.error(`[getUserSemester] Erro ao buscar semester do user ${user._id} - ${user.email}. ${error.message}`)
        if (error.code) throw error
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getUserSemester = getUserSemester