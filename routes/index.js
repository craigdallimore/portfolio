exports.init = function(app, db) {

    // Welcome page
    app.get('/', function(req, res) {
        res.redirect('/about/');
    });

};
