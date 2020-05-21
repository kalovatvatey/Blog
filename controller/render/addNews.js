module.exports = (req, res) => {
    res.render('addNews', {
        errors: req.flash('newsAddError'),
        data: req.flash('data')[0]
    })
}