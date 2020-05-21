const Register = require('../database/model/register')

module.exports = (req, res, next) => {
    Register.findById(req.session.userId, (error, register) => {
        if(error || !register) {
            return res.redirect('/login')
        }
        next()
    })
}