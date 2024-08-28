class NewsContrller {
    //[GET] news
    index(req, res) {
        res.render('news');
    }

    //[GET] /:slug
    show(req, res) {
        res.send('New Deltai');
    }
}

module.exports = new NewsContrller();
