const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quotesSchema = new Schema({
    name: { type: String },
    quote: { type: String }
})

module.exports = mongoose.model('Quotes', quotesSchema)