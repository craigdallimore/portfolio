exports.Login = function(User, passport) {

    return {
        get: function(req, res, next) {
            res.render('Login.jade', {
                email: req.flash('email'),
                message: req.flash('message')
            });
        },
        post: function(req, res, next) {

            if (req.body.email) {
                req.flash('email', req.body.email);
            }

            if (!req.body.email || !req.body.password) {
                req.flash('message', 'Missing Credentials');
                return res.redirect('/login');
            }

            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }

                if (!user) {
                    req.flash('message', 'Invalid Credentials');
                    return res.redirect('/login');
                }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    req.flash('message', 'You have logged in');
                    req.flash('apikey', user.apikey);
                    return res.redirect('/cms/');
                });
            })(req, res, next);
        }
    };


};
