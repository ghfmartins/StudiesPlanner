const Subject = require('../models/subject')

module.exports.create = async function(subject) {
    try {
        return await Subject.create(subject)
    } catch(error) {
        throw error
    }
}

module.exports.getById = async function(author, id) {
    try {
        return await Subject.findOne({ '_id': id, 'author': author })
    } catch(error) {
        throw error
    }
}

module.exports.get = async function(filter) {
    try {
        return await Subject.find(filter)
    } catch(error) {
        throw error
    }
}

module.exports.updateById = async function(author, id, set) {
    try {
        return await Subject.updateOne({ '_id': id, 'author': author }, { '$set': set})
    } catch(error) {
        throw error
    }
}

module.exports.deleteById = async function(author, id) {
    try {
        return await Subject.deleteOne({ '_id': id, 'author': author })
    } catch(error) {
        throw error
    }
}