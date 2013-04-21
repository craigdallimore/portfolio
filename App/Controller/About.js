var Q = require('q');

exports.About = function(model) {

    return function(req, res, next) {

        Q.all([

            model.Profile.findOne({ label: 'craigdallimore' }).exec(),
            model.Network.find().exec(),
            model.Tech.find().exec(),
            model.Book.find().exec()

        ]).spread(function(profile, networks, tech, books) {

            res.render('about.jade', {
                profile: profile,
                networks: networks,
                technologies: tech,
                books: books
            });

        }, next);
    };

};
