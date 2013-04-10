exports.init = function(App) {

    var Q = require('q');

    App.get('/about/', function(req, res, next) {

        Q.all([

            App.Model.Profile.findOne({ label: 'craigdallimore' }).exec(),
            App.Model.Network.find().exec(),
            App.Model.Tech.find().exec(),
            App.Model.Book.find().exec()

        ]).spread(function(profile, networks, tech, books) {

            res.render('about.jade', {
                profile: profile,
                networks: networks,
                technologies: tech,
                books: books
            });

        }, next);
    });

};
