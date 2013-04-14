var Q = require('q');

exports.Register = function(user) {

    var newUserPromise = function(credentials) {
        console.log('new user promise..');

        var deferred = Q.defer();

        user.save(function(err, newUser) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newUser);
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

                user.findOne().exec().then(function(foundUser) {

                    if (foundUser) {
                        message = 'Cannot register more than one user, you want to log in instead.';
                        console.log('Cannot register more than one user');
                    } else {
                        newUserPromise({ email: email, password: password }).then(function(newUser) {
                            console.log('New user' + newUser);
                            console.log('Log them in');
                            res.redirect('/cms/');
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
