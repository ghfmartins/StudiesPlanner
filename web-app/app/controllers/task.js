const taskRepository = require('../repositories/task')
const subjectRepository = require('../repositories/subject')

async function createTask(user, newTask) {
    try {
        validateTask(newTask)

        let subject = await subjectRepository.getById(user._id, newTask.subject)

        let task = newTask
        task.deadline = new Date(task.deadline)
        task.subject = {
            id: subject._id,
            author: user._id
        }
        task.create = new Date()

        return await taskRepository.create(task)
    } catch(error) {
        console.error(`[createTask] Erro ao criar task para o user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.createTask = createTask

function validateTask(task) {
    try {
        if (!task || Object.keys(task).length == 0 ) throw { code: 400, message: 'É obrigatório passar uma tarefa para ser salva!' }
        if (!task.name) throw { code: 400, message: 'É obrigatório passar um(a) nome/identificação da tarefa!' }
        if (!task.subject) throw { code: 400, message: 'É obrigatório passar a qual disciplina esta tarefa vai pertencer!' }
        if (!task.deadline) throw { code: 400, message: 'É obrigatório passar a data de entrega da tarefa!' }
    } catch(error) {
        throw error
    }
}
module.exports.validateTask = validateTask

async function getAllUserTasks(user) {
    try {
        let tasks = await taskRepository.get({ 'subject.author': user._id })
        return tasks
    } catch(error) {
        console.error(`[getAllUserTasks] Erro ao buscar tasks do user ${user._id} - ${user.email}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getAllUserTasks = getAllUserTasks

async function getUserTask(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para buscar uma tarefa específica!' }

        let task = await taskRepository.get({ '_id': id, 'subject.author': user._id })
        return task
    } catch(error) {
        console.error(`[getUserTask] Erro ao buscar task do user ${user._id} - ${user.email}. ${error.message}`)
        if (error.code) throw error
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.getUserTask = getUserTask

async function updateTask(user, id, updateTask) {
    try {
        if (!updateTask || Object.keys(updateTask).length == 0) return
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para buscar uma tarefa específica!' }

        validateUpdate(updateTask)
        if (updateTask.deadline)
            updateTask.deadline = new Date(updateTask.deadline)

        return taskRepository.updateById(user._id, id, updateTask)
    } catch(error) {
        console.error(`[updateTask] Erro ao atualizar task ${id} do user ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.updateTask = updateTask

function validateUpdate(update) {
    try {
        if (update.author) throw { code: 400, message: 'Não é possível atualizar o author da tarefa!' }
        if (update.subject) throw { code: 400, message: 'Não é possível atualizar a disciplina da tarefa!' }
        if (update.create) throw { code: 400, message: 'Não é possível atualizar a data de criação da tarefa!' }
        if (update.realized) throw { code: 400, message: 'Para marcar a tarefa como realizada use a rota específica da API para isso!' }
        if (update.realizedDate) throw { code: 400, message: 'Para marcar a de realização da tarefa use a rota específica da API para isso!' }
    } catch(error) {
        throw error
    }
}
module.exports.validateUpdate = validateUpdate

async function deleteTask(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para deletar uma tarefa específica!' }
        return taskRepository.deleteById(user._id, id)
    } catch(error) {
        console.error(`[deleteTask] Erro ao deletar task ${id} do user ${user._id} - ${user.email}. ${error.message}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.deleteTask = deleteTask

async function deleteTasksFromSubject(user, subjectId) {
    try {
        let filter = {}
        filter['subject.id'] = subjectId
        filter['subject.author'] = user._id

        let tasks = await taskRepository.get(filter)

        for (const task of tasks) {
            await taskRepository.deleteById(user._id, task._id)
        }
    } catch(error) {
        console.error(`[deleteTasksFromSubject] Erro ao buscar e deletar todas as tasks do subject ${subjectId}, ${user._id} - ${user.email}. ${error.message}`)
        throw error
    }
}
module.exports.deleteTasksFromSubject = deleteTasksFromSubject

async function realizedTask(user, id) {
    try {
        if (!id) throw { code: 400, message: 'É obrigatório passar um id na requisição para marcar como realizada uma tarefa específica!' }
        let set = {
            realized: true,
            realizedDate: new Date()
        }

        return await taskRepository.updateById(user._id, id, set)
    } catch(error) {
        console.error(`[realizedTask] Erro ao marcar task ${id} do user ${user._id} - ${user.email} como realized. ${error.message}`)
        throw { code: 500, message: 'Erro interno do servidor' }
    }
}
module.exports.realizedTask = realizedTask