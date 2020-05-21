const News = require('../database/model/news')

module.exports = async(req, res) => {
    const news = await News.findById(req.params.id)
    const newses = await News.find({})
    res.render('sidebar', {
        news,
        newses
    })
}
