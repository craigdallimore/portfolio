var Q = require('q');

exports.CMS = function(model) {

    return function(req, res, next) {

        if(! req.isAuthenticated()) {
            return res.redirect('/login');
        }

        Q.all([

            model.Book.find().exec()

        ]).spread(function(books) {

            res.render('cms.jade', {
                books: books,
                message: req.flash('message'),
                apikey: req.flash('apikey')
            });

        });


    };
};
