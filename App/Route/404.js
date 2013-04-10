exports.init = function(App) {

    App.use(function(req, res, next) {
        res.status(404);

        if (req.accepts('html')) {
            return res.render('404.jade');
        }
        if (req.accepts('json')) {
            return res.send({ error: 'Not Found' });
        }
        res.type('text').send('Not found');
    });


};
