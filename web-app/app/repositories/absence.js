const Absence = require('../models/absence')

module.exports.create = async function(absence) {
    try {
        return await Absence.create(absence)
    } catch(error) {
        throw error
    }
}

module.exports.get = async function(filter) {
    try {
        return await Absence.find(filter)
    } catch(error) {
        throw error
    }
}