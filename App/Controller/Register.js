var Q = require('q');

exports.Register = function(User) {

    var newUserPromise = function(credentials) {

        var deferred = Q.defer(),
            newUser = new User(credentials);

        newUser.save(function(err, item) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(item);
            }
        });

        return deferred.promise;
    };


    return {
        get: function(req, res, next) {
                res.render('Register.jade', {
                email: '',
                error: false
            });
        },
        post: function(req, res, next) {
            console.log('POST to /register');

            var email = '',
                password = '',
                confirmPassword = '',
                message = '';

            if (req.body) {
                email = req.body.email;
                password = req.body.password;
                confirmPassword = req.body.confirm_password;
                console.log('req.body:\n', req.body);
            }

            if (!email && !password && !confirmPassword) {
                message = 'No Credentials';
            } else {
                message = 'Invalid Credentials';
            }

            if (password && (password !== confirmPassword)) {
                message = 'Passwords do not match';
            }

            if (email && password && (password === confirmPassword)) {

                return User.findOne().exec().then(function(foundUser) {

                    if (foundUser) {
                        message = 'Cannot register more than one user, you want to log in instead.';
                        console.log('Cannot register more than one user');
                        foundUser.remove();
                        res.render('Register.jade', {
                            email: email,
                            error: 'Only one registered user can exist at a time.'
                        });

                    } else {
                        newUserPromise({ email: email, password: password }).then(function(newUser) {
                            console.log('New user:\n' + newUser);
                            console.log('Log them in');
                            return res.redirect('/cms/');
                        }, next);
                    }

                }, next);

            }

            res.render('Register.jade', {
                email: email,
                error: message
            });
        }
    };

};
