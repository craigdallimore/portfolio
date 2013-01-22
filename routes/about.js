exports.init = function(app, db) {

    app.get('/about/', function(req, res) {
        res.render('about.jade');
    });

};
