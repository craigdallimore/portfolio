var Q = require('q');

exports.About = function(model) {

    return function(req, res, next) {

        Q.all([

            model.profile.findOne({ label: 'craigdallimore' }).exec(),
            model.network.find().exec(),
            model.tech.find().exec(),
            model.book.find().exec()

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
