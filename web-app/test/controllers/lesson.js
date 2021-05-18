const assert = require('assert');
const lessonController = require('../../app/controllers/lesson')

describe('Testes unitários para o controller lesson', () => {
    describe('validateLesson()', () => {
        it('CT001 - lesson null', () => {
            let resultExpected = { code: 400, message: 'É obrigatório passar uma aula para ser salva!' }
            let result
            try {
                result = lessonController.validateLesson()
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT002 - lesson undefined', () => {
            let lesson = {}
            let resultExpected = { code: 400, message: 'É obrigatório passar uma aula para ser salva!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT003 - subject invalid', () => {
            let lesson = {
                duration: 40,
                realizationDays: []
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a qual disciplina esta aula vai pertencer!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT004 - duration invalid', () => {
            let lesson = {
                subject: 'Subject Test',
                realizationDays: []
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a duração das aulas!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT005 - realizationDays null', () => {
            let lesson = {
                subject: 'Subject Test',
                duration: 40
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar os dias da semana que a aula vai ser realizada!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT006 - realizationDays empty', () => {
            let lesson = {
                subject: 'Subject Test',
                duration: 40,
                realizationDays: []
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar os dias da semana que a aula vai ser realizada!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT007 - realizationDays without day', () => {
            let lesson = {
                subject: 'Subject Test',
                duration: 40,
                realizationDays: [{
                    start: '18:50'
                }]
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar o dia da semana e horário de inicio de cada aula!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT008 - realizationDays without day', () => {
            let lesson = {
                subject: 'Subject Test',
                duration: 120,
                realizationDays: [{
                    day: 'wed',
                    start: '18:50'
                },{
                    start: '18:50'
                }]
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar o dia da semana e horário de inicio de cada aula!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT009 - realizationDays without start', () => {
            let lesson = {
                subject: 'Subject Test',
                duration: 40,
                realizationDays: [{
                    day: 'mon'
                }]
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar o dia da semana e horário de inicio de cada aula!' }
            let result
            try {
                result = lessonController.validateLesson(lesson)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
    });
})
