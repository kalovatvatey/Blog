 const News = require('../database/model/news')
/*
module.exports = async(req, res) => {
    const news = await News.findByIdAndDelete(req.body.id)
    res.redirect('/news')
} */

// Delete a note with the specified noteId in the request
module.exports = (req, res) => {
    News.findByIdAndRemove(req.params.id)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.redirect('/news')
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};