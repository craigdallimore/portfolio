exports.Register = function(User, passport) {

    return {

        get: function(req, res, next) {
            res.render('Register.jade', {
                email: req.flash('email'),
                message: req.flash('message')
            });
        },

        post: function(req, res, next) {

            var email = req.body.email,
                password = req.body.password,
                confirmPassword = req.body.confirm_password;

            return User.findOne().exec().then(function(foundUser) {

                if (foundUser) {
                    req.flash('message', 'Only one registered user can exist at a time');
                    return res.redirect('/register');
                }

                if (email) {
                    req.flash('email', email);
                }

                if (!email || !password || !confirmPassword) {
                    req.flash('message', 'Missing Credentials');
                    return res.redirect('/register');
                }

                if (password && password !== confirmPassword) {
                    req.flash('message', 'Passwords did not match');
                    return res.redirect('/register');
                }

                var newUser = new User({
                    email: email,
                    password: password
                });

                newUser.save(function(err, user) {
                    if (err) { return next(err); }

                    passport.authenticate('local', function(err, user, info) {
                        if (err) { return next(err); }
                        if (!user) {
                            req.flash('message', 'Invalid credentials');
                            return res.redirect('/register');
                        }
                        req.logIn(user, function(err) {
                            if (err) { return next(err); }
                            req.flash('message', 'You have logged in');
                            return res.redirect('/cms');
                        });
                    })(req, res, next);
                });

            }, next);

        }
    };

};
