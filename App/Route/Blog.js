exports.init = function(app, db) {

    app.get('/blog/', function(req, res) {
        res.render('blog.jade');
    });

};
