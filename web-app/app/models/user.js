const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    create: { type: Date, required: true },
    status: { type: String , default: 'active'},
    auth: {
        key: String,
        token: String
    }
})

module.exports = mongoose.model('Users', schema)