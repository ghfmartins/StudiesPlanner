const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    subject: {
        id: {type: mongoose.Schema.Types.ObjectId, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, required: true}
    },
    date: { type: Date, required: true },
    create: { type: Date, required: true }
})

module.exports = mongoose.model('Absences', schema)