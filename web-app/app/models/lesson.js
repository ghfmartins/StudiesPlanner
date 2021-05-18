const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    subject: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, required: true }
    },
    duration: { type: Number, required: true},
    realizationDays: [{
        day: {
            type: String,
            enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            required: true
        },
        start: { type: String, required: true }
    }],
    quantity: Number,
    create: { type: Date, required: true }
})

module.exports = mongoose.model('Lessons', schema)