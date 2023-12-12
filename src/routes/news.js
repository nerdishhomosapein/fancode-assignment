const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const data = req.body;
            return res.json(await News.createNews(data));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/matches').get(async (req, res, next) => {
        try {
            const matchId = parseInt(req.query.matchId);
            return res.json(await News.getNewsByMatchId(matchId));
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/tours').get(async (req, res, next) => {
        try {
            const tourId = parseInt(req.query.tourId);
            return res.json(await News.getNewsByTourId(tourId));
        } catch (err) {
            return next(err);
        }
    })

    app.route('/news/sports').get(async (req, res, next) => {
        try {
            const sportId = parseInt(req.query.sportId);
            return res.json(await News.getNewsBySportId(sportId));
        } catch (err) {
            return next(err);
        }
    })
}
