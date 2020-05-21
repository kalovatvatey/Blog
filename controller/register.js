const Register = require('../database/model/register')

module.exports = (req, res) => {
    Register.create(req.body, (error, register) => {
        if(error) {
            console.log(error)
            const registerError = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('registerError', registerError)
            req.flash('data', req.body)
            return res.redirect('/register')
        }
        res.redirect('/')
    })
}