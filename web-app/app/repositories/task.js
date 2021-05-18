const Task = require('../models/task')

module.exports.create = async function(task) {
    try {
        return await Task.create(task)
    } catch(error) {
        throw error
    }
}

module.exports.get = async function(filter) {
    try {
        return await Task.find(filter)
    } catch(error) {
        throw error
    }
}

module.exports.updateById = async function(author, id, set) {
    try {
        return Task.updateOne({ '_id': id, 'subject.author': author }, { '$set': set })
    } catch(error) {
        throw error
    }
}

module.exports.deleteById = async function(author, id) {
    try {
        return await Task.deleteOne({ '_id': id, 'subject.author': author })
    } catch(error) {
        throw error
    }
}