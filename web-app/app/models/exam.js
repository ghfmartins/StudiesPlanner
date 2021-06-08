const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: { type: String, required: true },
    subject: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, required: true }
    },
    theme: String,
    date: { type: Date, required: true },
    create: { type: Date, required: true }
})

module.exports = mongoose.model('Exams', schema)