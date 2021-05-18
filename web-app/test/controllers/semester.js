const assert = require('assert');
const semesterController = require('../../app/controllers/semester')

describe('Testes unitários para o controller semester', () => {
    describe('validateDate()', () => {
        it('CT001 - startDate > endDate', () => {
            let semester = {
                startDate: '2020-12-10',
                endDate: '2020-12-01'
            }
            let resultExpected = { code: 400, message: 'A data de início do período deve ser menor que a data de término!' }
            let result
            try {
                result = semesterController.validateDate(semester)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
    });
    describe('validateSemester()', () => {
        it('CT002 - semester null', () => {
            let resultExpected = { code: 400, message: 'É obrigatório passar um período para ser salvo!' }
            let result
            try {
                result = semesterController.validateSemester()
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT003 - semester undefined', () => {
            let semester = {}
            let resultExpected = { code: 400, message: 'É obrigatório passar um período para ser salvo!' }
            let result
            try {
                result = semesterController.validateSemester(semester)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT004 - name invalid', () => {
            let semester = {
                startDate: '2020-12-01',
                endDate: '2020-12-10'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar um(a) nome/identificação do período!' }
            let result
            try {
                result = semesterController.validateSemester(semester)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT005 - startDate invalid', () => {
            let semester = {
                name: 'Name Test',
                endDate: '2020-12-10'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a data de início do período!' }
            let result
            try {
                result = semesterController.validateSemester(semester)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT006 - endDate invalid', () => {
            let semester = {
                name: 'Name Test',
                startDate: '2020-12-10'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a data de término do período!' }
            let result
            try {
                result = semesterController.validateSemester(semester)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
    });
})
