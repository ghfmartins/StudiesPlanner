const Lesson = require('../models/lesson')

module.exports.create = async function(lesson) {
    try {
        return Lesson.create(lesson)
    } catch(error) {
        throw error
    }
}

module.exports.getById = async function(author, id) {
    try {
        return await Lesson.findOne({ '_id': id, 'subject.author': author })
    } catch(error) {
        throw error
    }
}

module.exports.get = async function(filter) {
    try {
       return await Lesson.find(filter)
    } catch(error) {
        throw error
    }
}

module.exports.updateById = async function(author, id, set) {
    try {
       return Lesson.updateOne({ '_id': id, 'subject.author': author }, { '$set': set })
    } catch(error) {
        throw error
    }
}

module.exports.deleteById = async function(author, id) {
    try {
        return await Lesson.deleteOne({ '_id': id, 'subject.author': author })
    } catch(error) {
        throw error
    }
}