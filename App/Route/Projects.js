exports.init = function(App) {

    var _ = require('underscore');

    App.get('/projects/:label', function(req, res, next) {
        App.Controller.Get('Project').then(function(items) {

            var item = _.find(items, function(match) {
                return match.label === req.params.label;
            });

            if (items.length && item) {
                res.render('project.jade', { projects: items, project: item });
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);

    });

    App.get('/projects/', function(req, res, next) {
        App.Controller.Get('Project').then(function(items) {
            if (items.length) {
                res.render('projects.jade', { projects: items });
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    });

};
