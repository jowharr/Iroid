const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jowharr:12345@cluster0.o4wqceo.mongodb.net/Profile1?retryWrites=true&w=majority')

const Schema = mongoose.Schema

const reg = new Schema({
    FullName: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true }
})

var input = mongoose.model('sign_up_tbs', reg)
module.exports = input