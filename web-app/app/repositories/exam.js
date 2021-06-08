const Exam = require('../models/exam')

module.exports.create = async function(exam) {
    try {
        return Exam.create(exam)
    } catch(error) {
        throw error
    }
}

module.exports.getById = async function(author, id) {
    try {
        return Exam.findOne({ '_id': id, 'subject.author': author })
    } catch(error) {
        throw error
    }
}

module.exports.get = async function(filter) {
    try {
        return await Exam.find(filter)
    } catch(error) {
        throw error
    }
}

module.exports.updateById = async function(author, id, set) {
    try {
        return Exam.updateOne({ '_id': id, 'subject.author': author }, { '$set': set })
    } catch(error) {
        throw error
    }
}

module.exports.deleteById = async function(author, id) {
    try {
        return await Exam.deleteOne({ '_id': id, 'subject.author': author })
    } catch(error) {
        throw error
    }
}