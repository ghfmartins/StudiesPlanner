const Semester = require('../models/semester')

module.exports.create = async function(semester) {
    try {
        return await Semester.create(semester)
    } catch(error) {
        throw error
    }
}

module.exports.getById = async function(author, id) {
    try {
        return await Semester.findOne({ '_id': id, 'author': author })
    } catch(error) {
        throw error
    }
}

module.exports.get = async function(filter) {
    try {
        return await Semester.find(filter)
    } catch(error) {
        throw error
    }
}

module.exports.updateById = async function(author, id, set) {
    try {
        return await Semester.update({ '_id': id, 'author': author }, { '$set': set })
    } catch(error) {
        throw error
    }
}

module.exports.deleteById = async function(author, id) {
    try {
        return await Semester.deleteOne({ '_id': id, 'author': author })
    } catch(error) {
        throw error
    }
}