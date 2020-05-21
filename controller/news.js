const News = require('../database/model/news')

module.exports = async(req, res) => {
    const newses = await News.find({})
    res.render('landingPage', {
        newses
    })
}