const moment = require('moment')
const subjectRepository = require('../repositories/subject')
const lessonRepository = require('../repositories/lesson')

async function createLesson(user, newLesson) {
    try {
        validateLesson(newLesson)

        let subject = await subjectRepository.getById(user._id, newLesson.subject)

        let lesson = newLesson
        lesson.subject = {
            id: subject._id,
            author: user._id
        }
        lesson.create = new Date()
        lesson.quantity = calculateLessonsQuantity(subject.start, subject.end, lesson.realizationDays)

        return await lessonRepository.create(lesson)
    } catch(error) {
        console.error(`[createClass] Erro ao criar lesson para o user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.createLesson = createLesson

function validateLesson(lesson) {
    try {
        if (!lesson || Object.keys(lesson).length === 0) throw { code: 400, message: 'É obrigatório passar uma aula para ser salva!' }
        if (!lesson.subject) throw { code: 400, message: 'É obrigatório passar a qual disciplina esta aula vai pertencer!' }
        if (!lesson.duration) throw { code: 400, message: 'É obrigatório passar a duração das aulas!' }
        if (!lesson.realizationDays || lesson.realizationDays.length === 0 ) throw { code: 400, message: 'É obrigatório passar os dias da semana que a aula vai ser realizada!' }

        lesson.realizationDays.forEach(lessonDay => {
            if (!lessonDay.day || !lessonDay.start)
                throw { code: 400, message: 'É obrigatório passar o dia da semana e horário de inicio de cada aula!' }
        })
    } catch(error) {
        throw error
    }
}
module.exports.validateLesson = validateLesson

function calculateLessonsQuantity(subjectStart, subjectEnd, realizationDays) {
    try {
        let quantityDays = 0
        let realizationWeekDays = realizationDays.map(realizationDay => {
           switch (realizationDay.day) {
               case 'mon':
                   return 1
               case 'tue':
                   return 2
               case 'wed':
                   return 3
               case 'thu':
                   return 4
               case 'fri':
                   return 5
               case 'sat':
                   return 6
           }
        })

        let start = moment(new Date(subjectStart))
        let end = moment(new Date(subjectEnd))
        let subjectDuration = moment.duration(end.diff(start)).asDays()
        for (let day = 0; day <= subjectDuration; day++) {
            realizationWeekDays.forEach(weekDay => {
                if (weekDay === moment(new Date(subjectStart)).add(day,'day' ).add(3, 'hours').toDate().getDay())
                    quantityDays++
            })
        }
        return quantityDays
    } catch(error) {
        throw error
    }
}
module.exports.calculateLessonsQuantity = calculateLessonsQuantity

async function getAllUserLessons(user) {
    try {
        let lessons = await lessonRepository.get({ 'subject.author': user._id })
        return lessons
    } catch(error) {
        console.error(`[getAllUserLessons] Erro ao buscar lessons do user ${user._id} - ${user.email}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getAllUserLessons = getAllUserLessons

async function getUserLesson(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para buscar uma aula específica!' }

        let lesson = await lessonRepository.getById(user._id, id)
        return lesson
    } catch(error) {
        console.error(`[getUserLesson] Erro ao buscar lesson do user ${user._id} - ${user.email}. ${error.message}`)
        if (error.code) throw error
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getUserLesson = getUserLesson