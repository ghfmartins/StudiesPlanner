const express = require('express')
const router = express.Router()
const middleware = require('../controllers/middleware')
const subjectController = require('../controllers/subject')
const examController = require('../controllers/exam')

router.all('/*', middleware.authenticateByToken)

router.get('/', getAllSubsjects)

router.get('/:id', getSubsject)

router.post('/', createSubject)

router.put('/:id', updateSubject)

router.delete('/:id', deleteSubject)

router.get('/:id/exams', getExamsFromSubject)

router.put('/:id/grade', updateGrade)

router.get('/:id/grade', getSubjectGrade)

router.post('/absence', registerAbsenceInLesson)

router.get('/:id/absence', getSubjectAbsences)

router.get('/:id/absence/percent', calculatePercentageAttendance)

module.exports = router

async function getAllSubsjects(req, res) {
    try {
        let subjects = await subjectController.getAllUserSubjects(req.user)
        res.status(200).send({ subjects: subjects })
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function getSubsject(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let subject = await subjectController.getUserSubject(user, id)
        res.status(201).send(subject)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

async function createSubject(req, res) {
    try {
        await subjectController.createSubject(req.user, req.body)
        res.status(201).send('Disciplina criada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function updateSubject(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let update = req.body
        await subjectController.updateSubject(user, id, update)
        res.status(200).send('Disciplina atualizada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function deleteSubject(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        await subjectController.deleteSubject(user, id)
        res.status(200).send('Disciplina exlcuida!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function getExamsFromSubject(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let exams = await examController.getExamsFromSubject(user, id)
        res.status(200).send({ exams: exams })
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function updateGrade(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let grades = req.body
        await subjectController.updateGrade(user, id, grades)
        res.status(200).send('Notas registradas!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function getSubjectGrade(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let grades = await subjectController.getSubjectGrade(user, id)
        res.status(200).send(grades)
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function registerAbsenceInLesson(req, res) {
    try {
        await subjectController.registerAbsenceInLesson(req.user, req.body)
        res.status(201).send('Ausência registrada!')
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function getSubjectAbsences(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let absences = await subjectController.getSubjectAbsences(user, id)
        res.status(200).send({ absences: absences })
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function calculatePercentageAttendance(req, res) {
    try {
        let user = req.user
        let id = req.params.id
        let attendance = await subjectController.calculatePercentageAttendance(user, id)
        res.status(200).send({ attendance: attendance })
    } catch(error) {
        res.status(error.code || 500).send(error.message)
    }
}