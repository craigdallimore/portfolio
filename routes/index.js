exports.init = function(app, db) {

    app.get('/', function(req, res) {
        res.render('index.jade');
    });

};
