exports.init = function(App) {

    App.get('/cms', function(req, res) {
        res.render('cms.jade');
    });

};
