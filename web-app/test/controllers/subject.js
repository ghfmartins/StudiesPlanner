const assert = require('assert');
const subjecteController = require('../../app/controllers/subject')

describe('Testes unitários para o controller subject', () => {
    describe('validateDate()', () => {
        it('CT001 - start > end', () => {
            let subject = {
                start: '2020-12-10',
                end: '2020-12-01'
            }
            let resultExpected = { code: 400, message: 'A data de início da disciplina deve ser menor que a data de término!' }
            let result
            try {
                result = subjecteController.validateDate(subject)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
    });
    describe('validateSubject()', () => {
        it('CT002 - subject null', () => {
            let resultExpected = { code: 400, message: 'É obrigatório passar uma disciplina para ser salva!' }
            let result
            try {
                result = subjecteController.validateSubject()
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT003 - name invalid', () => {
            let subject = {
                semester: 'abcd1234',
                start: '2020-12-01',
                end: '2020-12-31'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar um(a) nome/identificação para a disciplina que será salva!' }
            let result
            try {
                result = subjecteController.validateSubject(subject)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT004 - semester invalid', () => {
            let subject = {
                name: 'Name Test',
                start: '2020-12-01',
                end: '2020-12-31'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a qual período esta disciplina vai pertencer!' }
            let result
            try {
                result = subjecteController.validateSubject(subject)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT005 - start invalid', () => {
            let subject = {
                name: 'Name Test',
                semester: 'abcd1234',
                end: '2020-12-31'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a data de início da disciplina!' }
            let result
            try {
                result = subjecteController.validateSubject(subject)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT006 - end invalid', () => {
            let subject = {
                name: 'Name Test',
                semester: 'abcd1234',
                start: '2020-12-31'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar a data de término da disciplina!' }
            let result
            try {
                result = subjecteController.validateSubject(subject)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
    });
})
