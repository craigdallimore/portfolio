exports.CMS = function(User) {
    return function(req, res, next) {
        if(req.isAuthenticated()) {
            res.render('cms.jade', {
                message: req.flash('message'),
                apikey: req.flash('apikey')
            });
        } else {
            res.redirect('/login');
        }

    };
};
