const assert = require('assert');
const userController = require('../../app/controllers/user')

describe('Testes unitários para o controller user', () => {
    describe('validateEmail()', () => {
        it('CT001 - email undefined', () => {
            let result = userController.validateEmail('')

            assert.equal(result, false);
        });
        it('CT002 - email invalid', () => {
            let result = userController.validateEmail('pedro@')

            assert.equal(result, false);
        });
        it('CT003 - email invalid', () => {
            let result = userController.validateEmail('pedro@.com')

            assert.equal(result, false);
        });
        it('CT004 - email invalid', () => {
            let result = userController.validateEmail('@.com')

            assert.equal(result, false);
        });
        it('CT005 - email invalid', () => {
            let result = userController.validateEmail('pedro.com')

            assert.equal(result, false);
        });
        it('CT006 - email invalid', () => {
            let result = userController.validateEmail('pedro..@@.com')

            assert.equal(result, false);
        });
        it('CT007 - email valid', () => {
            let result = userController.validateEmail('pedro@gmail.com')

            assert.equal(result, true);
        });
    });
    describe('validateUser()', () => {
        it('CT008 - user null', () => {
            let resultExpected = { code: 400, message: 'É obrigatório passar um email de usuário e senha para cadastro!' }
            let result
            try {
                result = userController.validateUser()
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT009 - user undefined', () => {
            let user = {}
            let resultExpected = { code: 400, message: 'É obrigatório passar um email de usuário e senha para cadastro!' }
            let result
            try {
                result = userController.validateUser(user)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT010 - email undefined', () => {
            let user = {
                email: ''
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar um email de usuário e senha para cadastro!' }
            let result
            try {
                result = userController.validateUser(user)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT011 - email invalid', () => {
            let user = {
                email: 'a'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar um email válido para o usuário!' }
            let result
            try {
                result = userController.validateUser(user)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
        it('CT012 - password undefined', () => {
            let user = {
                email: 'pedro@gmail.com'
            }
            let resultExpected = { code: 400, message: 'É obrigatório passar uma senha válida para o usuário!' }
            let result
            try {
                result = userController.validateUser(user)
            } catch(error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        });
    });
})
