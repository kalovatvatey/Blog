const News = require('../database/model/news')
const path = require('path')
const cloudinary = require('cloudinary')

module.exports = (req, res) => {
    const { image } = req.files
    const uploadPath = path.resolve(__dirname, '..', 'public/assets/news', image.name)
    image.mv(uploadPath, (error) => {
        cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
            if (error) {
                res.redirect('/')
            }
            News.create({
                ...req.body,
                /* image: `/news/${ image.name }`, */
                image: result.secure_url,
            }, (error, news) => {
                if(error) {
                    const newsAddError = Object.keys(error.errors).map(key => error.errors[key].message)
                    req.flash('newsAddError', newsAddError)
                    req.flash('data', req.body)
                    return res.redirect('/add/news')
                }
                res.redirect('/news')
            })
        })
        
    })
}