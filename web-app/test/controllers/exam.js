const assert = require('assert');
const examsController = require('../../app/controllers/exam')

describe('Testes unitários para o controller exam', () => {
    describe('validateExam()', () => {
        it('CT001 - exam null', () => {
            let resultExpected = { code: 400, message: 'É obrigatório passar uma prova para ser salva!' }
            let result
            try {
                result = examsController.validateExam()
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT002 - exam undefined', () => {
            let exam = {}
            let resultExpected = { code: 400, message: 'É obrigatório passar uma prova para ser salva!' }
            let result
            try {
                result = examsController.validateExam(exam)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT003 - name invalid', () => {
            let exam = {
                subject: 'Subject Test',
                date: new Date()
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar um(a) nome/identificação da prova!' }
            let result
            try {
                result = examsController.validateExam(exam)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT004 - subject invalid', () => {
            let exam = {
                name: 'Name Test',
                date: new Date()
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a qual disciplina esta prova vai pertencer!' }
            let result
            try {
                result = examsController.validateExam(exam)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT005 - date invalid', () => {
            let exam = {
                name: 'Name Test',
                subject: 'Subject Test'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a data de realização da prova!' }
            let result
            try {
                result = examsController.validateExam(exam)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
    })
})
