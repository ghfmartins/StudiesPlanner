const User = require('../models/user')

module.exports.create = async function(user) {
    try {
        return await User.create(user)
    } catch(error) {
        throw error
    }
}

module.exports.getByToken = async function (token) {
    try {
        return await User.findOne({'auth.token': token})
    } catch (error) {
        throw error
    }
}

module.exports.updateById = async function (id, set) {
    try {
        return await User.updateOne({ '_id': id }, { '$set': set })
    } catch(error) {
        throw error
    }
}