exports.init = function(app, js) {

    //404
    app.get('*', function(req, res) {
        res.render('404.jade');
    });

};
