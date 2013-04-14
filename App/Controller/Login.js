exports.Login = function(user) {

    return {
        get: function(req, res, next) {
            res.render('Login.jade', {
                error: false
            });
        },
        post: function(req, res, next) {
            console.log('POST to /login');

            var email = req.body.email,
                password = req.body.password,
                message;

            if (!email && !password) {
                message = 'No Credentials';
            } else {
                message = 'Invalid Credentials';
            }

            res.render('Login.jade', {
                error: message
            });
        }
    };


};
