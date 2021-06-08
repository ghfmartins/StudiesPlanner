const semesterRepository = require('../repositories/semester')
const subjectRepository = require('../repositories/subject')
const examRepository = require('../repositories/exam')
const taskRepository = require('../repositories/task')
const lessonRepository = require('../repositories/lesson')
const subjectController = require('./subject')

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

async function updateSemester(user, id, updateSemester) {
    try {
        if (!updateSemester || Object.keys(updateSemester).length == 0) return
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para buscar um período específico!' }

        let semester = await semesterRepository.getById(user._id, id)
        validateUpdate(updateSemester, semester)

        return await semesterRepository.updateById(user._id, id, updateSemester)
    } catch (error) {
        console.error(`[updateSemester] Erro ao atualizar semester ${id} do user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.updateSemester = updateSemester

function validateUpdate(update, semester) {
    try {
        if (update._id || update.id) throw { code: 400, message: 'Não é possível atualizar o id do período!' }
        if (update.author) throw { code: 400, message: 'Não é possível atualizar o author do período!' }
        if (update.startDate && !update.endDate) {
            update.startDate = new Date(update.startDate)
            if (update.startDate > semester.endDate) throw { code: 400, message: 'A data de início do período deve ser menor que a data de término!' }
        } else if (!update.startDate && update.endDate) {
            update.endDate = new Date(update.endDate)
            if (update.endDate < semester.startDate) throw { code: 400, message: 'A data de início do período deve ser menor que a data de término!' }
        } else if (update.startDate && update.endDate) {
            validateDate(update)
        }
    } catch(error) {
        throw error
    }
}
module.exports.validateUpdate = validateUpdate

async function deleteSemester(user, id) {
    try {
        let semester = await semesterRepository.getById(user._id, id)
        if (!semester) throw { code: 406, message: 'O período selecionado para exclusão não existe!'}

        await subjectController.deleteSubject(user, null, semester._id)
        await semesterRepository.deleteById(user._id, semester._id)
    } catch(error) {
        console.error(`[deleteSemester] Erro ao deleter semeter ${id} do user ${user._id} - ${user.email}. ${error.message}. ${error.message}`)
        throw error
    }
}
module.exports.deleteSemester = deleteSemester

async function getSemesterInfo(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para recuperar as informações do período!' }

        let semesterInfo = {}
        let semester = await semesterRepository.getById(user._id, id)
        if (!semester) throw { code: 400, message: 'Período não encontrado!' }

        semesterInfo.name = semester.name
        semesterInfo.start = semester.startDate
        semesterInfo.end = semester.endDate
        semesterInfo.subjects = []

        let subjects = await subjectRepository.get({ 'author': user._id, 'semester': id })
        for (const subject of subjects) {
            let filter = { 'subject.id': subject._id, 'subject.author': user._id }
            let exams = await examRepository.get(filter)
            let tasks = await taskRepository.get(filter)
            let lessons = await lessonRepository.get(filter)

            semesterInfo.subjects.push({
                name: subject.name,
                exams: bindExamsInfo(exams),
                tasks: bindTasksInfo(tasks),
                lessons: bindLessonsInfo(lessons)
            })
        }

        return semesterInfo
    } catch(error) {
        console.error(`[getSemesterInfo] Erro ao recuperar as informações do semester ${id} do user ${user._id} - ${user.email}. ${error.message}. ${error.message}`)
        throw error
    }
}
module.exports.getSemesterInfo = getSemesterInfo

function bindExamsInfo(exams) {
    return exams.map(exam => {
        return {
            name: exam.name,
            theme: exam.theme || '',
            date: exam.date
        }
    })
}
module.exports.bindExamsInfo = bindExamsInfo

function bindTasksInfo(tasks) {
    return tasks.map(task => {
        return {
            name: task.name,
            realized: task.realized,
            deadline: task.deadline,
            realizedDate: task.realizedDate
        }
    })
}
module.exports.bindTasksInfo = bindTasksInfo

function bindLessonsInfo(lessons) {
    return lessons.map(lesson => {
        return {
            duration: lesson.duration,
            realizationDays: lesson. realizationDays
        }
    })
}
module.exports.bindLessonsInfo = bindLessonsInfo