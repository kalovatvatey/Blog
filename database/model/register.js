const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const RegisterSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username Required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email Required']
    },
    password: {
        type: String,
        required: [true, 'Password Required']
    }
})

RegisterSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    })
}) //hook

module.exports = mongoose.model('Register', RegisterSchema)