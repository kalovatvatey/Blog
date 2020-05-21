const Register = require('../database/model/register')
const bcrypt = require('bcryptjs')

module.exports = ( req, res) => {
    const {email, password} = req.body

    Register.findOne({email}, (error, register) => {
        if(register) {
            bcrypt.compare(password, register.password, (error, same) => {
                if(same) {
                    req.session.userId = register._id
                    console.log()
                    res.redirect('/')
                } else {
                    res.redirect('/login')
                }
            })
        } else {
            res.redirect('/login')
        }
    })
}