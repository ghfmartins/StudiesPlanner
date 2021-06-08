const subjectRepository = require('../repositories/subject')
const examRepository = require('../repositories/exam')

async function createExam(user, newExam) {
    try {
        validateExam(newExam)

        let subject = await subjectRepository.getById(user._id, newExam.subject)

        let exam = newExam
        exam.date = new Date(exam.date)
        exam.subject = {
            id: subject._id,
            author: user._id
        }
        exam.create = new Date()

        return await examRepository.create(exam)
    } catch(error) {
        console.error(`[createExam] Erro ao criar exam para o user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.createExam = createExam

function validateExam(exam) {
    try {
        if (!exam || Object.keys(exam).length === 0) throw { code: 400, message: 'É obrigatório passar uma prova para ser salva!' }
        if (!exam.name) throw { code: 400, message: 'É obrigatório passar um(a) nome/identificação da prova!' }
        if (!exam.subject) throw { code: 400, message: 'É obrigatório passar a qual disciplina esta prova vai pertencer!' }
        if (!exam.date) throw { code: 400, message: 'É obrigatório passar a data de realização da prova!' }
    } catch(error) {
        throw error
    }
}
module.exports.validateExam = validateExam

async function getAllUserExams(user) {
    try {
        let exams = await examRepository.get({ 'subject.author': user._id })
        return exams
    } catch(error) {
        console.error(`[getAllUserExams] Erro ao buscar exams do user ${user._id} - ${user.email}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getAllUserExams = getAllUserExams

async function getUserExam(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para buscar uma prova específica!' }

        let exam = await examRepository.getById(user._id, id)
        return exam
    } catch(error) {
        console.error(`[getUserExam] Erro ao buscar exam do user ${user._id} - ${user.email}. ${error.message}`)
        if (error.code) throw error
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getUserExam = getUserExam

async function updateExam(user, id, updateExam) {
    try {
        if (!updateExam || Object.keys(updateExam).length === 0) return
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para atualizar uma prova específica!' }

        validateUpdate(updateExam)
        if (updateExam.date)
            updateExam.date = new Date(updateExam.date)

        return await examRepository.updateById(user._id, id, updateExam)
    } catch(error) {
        console.error(`[updateExam] Erro ao atualizar exam ${id} do user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.updateExam = updateExam

function validateUpdate(update) {
    try {
        if (update.subject) throw { code: 400, message: 'Não é possível atualizar a disciplina da prova!' }
        if (update.create) throw { code: 400, message: 'Não é possível atualizar a data de criação da prova!' }
    } catch(error) {
        throw error
    }
}
module.exports.validateUpdate = validateUpdate

async function deleteExam(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para deletar uma prova específica!' }
        return await examRepository.deleteById(user._id, id)
    } catch(error) {
        console.error(`[deleteExam] Erro ao deletar exam ${id} do user ${user._id} - ${user.email}. ${error.message}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.deleteExam = deleteExam

async function deleteExamsFromSubject(user, subjectId) {
    try {
        let filter = {}
        filter['subject.id'] = subjectId
        filter['subject.author'] = user._id

        let exams = await examRepository.get(filter)

        for (const exam of exams) {
            await examRepository.deleteById(user._id, exam._id)
        }
    } catch(error) {
        console.error(`[deleteExamsFromSubject] Erro ao buscar e deletar todas as tasks do subject ${subjectId}, ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.deleteExamsFromSubject = deleteExamsFromSubject

async function getExamsFromSubject(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar o id da disciplina na requisição para buscar as provas!' }

        let filter = {}
        filter['subject.id'] = id
        filter['subject.author'] = user._id

        let exams = examRepository.get(filter)
        return exams
    } catch(error) {
        console.error(`[getExamsFromSubject] Erro ao buscar exmas para o subject ${id} do user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.getExamsFromSubject = getExamsFromSubject