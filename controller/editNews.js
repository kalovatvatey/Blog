const News = require('../database/model/news')

module.exports = async(req, res) => {
    const news = await News.findById(req.params.id)
    res.render('editNews', {
        news
    })
}
