const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
    name: { type: String },
    quote: { type: String }
})

module.exports = mongoose.model('Quote', quoteSchema)