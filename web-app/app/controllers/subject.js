const subjectRepository = require('../repositories/subject')
const semesterRepository = require('../repositories/semester')

async function createSubject(user, newSubject) {
    try {
        validateSubject(newSubject)

        let semester = await semesterRepository.getById(user._id, newSubject.semester)
        if (!semester) throw { code: 406, message: 'O período passado ao qual a disciplina vai pertencer não foi encontrado!' }

        let subject = newSubject
        subject.author = user._id
        subject.create = new Date()

        return subjectRepository.create(subject)
    } catch(error) {
        console.error(`[createSubject] Erro ao criar subject para o user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.createSubject = createSubject

function validateSubject(subject) {
    try {
        if (!subject || Object.keys(subject).length == 0) throw { code: 400, message: 'É obrigatório passar uma disciplina para ser salva!' }
        if (!subject.name) throw { code: 400, message: 'É obrigatório passar um(a) nome/identificação para a disciplina que será salva!' }
        if (!subject.semester) throw { code: 400, message: 'É obrigatório passar a qual período esta disciplina vai pertencer!' }
        if (!subject.start) throw { code: 400, message: 'É obrigatório passar a data de início da disciplina!' }
        if (!subject.end) throw { code: 400, message: 'É obrigatório passar a data de término da disciplina!' }

        validateDate(subject)
    } catch(error) {
        throw error
    }
}
module.exports.validateSubject = validateSubject

function validateDate(subject) {
    try {
        let startDate = new Date(subject.start)
        let endDate = new Date(subject.end)

        if (startDate > endDate)
            throw { code: 400, message: 'A data de início da disciplina deve ser menor que a data de término!' }

        subject.start = startDate
        subject.end = endDate
    } catch(error) {
        throw error
    }
}
module.exports.validateDate = validateDate

async function getAllUserSubjects(user) {
    try {
        let subjects = await subjectRepository.get({ 'author': user._id })
        return subjects
    } catch(error) {
        console.error(`[getAllUserSubjects] Erro ao buscar subjects do user ${user._id} - ${user.email}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getAllUserSubjects = getAllUserSubjects

async function getUserSubject(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para buscar uma disciplina específica!' }

        let subject = await subjectRepository.getById(user._id, id)
        return subject
    } catch(error) {
        console.error(`[getUserSubject] Erro ao buscar subject do user ${user._id} - ${user.email}. ${error.message}`)
        if (error.code) throw error
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getUserSubject = getUserSubject