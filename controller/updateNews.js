const News= require('../database/model/news')

module.exports = async(req, res) => {
    console.log('running')
    const info = await News.findByIdAndUpdate(req.params.id, {
        author: req.body.author,
        createdAt: Date(),
        email: req.body.email,
        title: req.body.title,
        subtitle: req.body.subtitle,
        city: req.body.city,
        news: req.body.news
    })
    res.redirect('/news')
}