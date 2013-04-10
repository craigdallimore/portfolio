exports.init = function(App) {

    App.get('/', function(req, res) {
        res.render('index.jade');
    });

};
