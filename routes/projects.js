exports.init = function(app, db) {

    app.get('/projects/:label', function(req, res) {
        db.findAll('projects', function(projects) {

            var _ = require('underscore');
            var project = _.find(projects, function(match) {
                return match.label === req.params.label;
            });


            res.render('project.jade', {
                projects: projects,
                project: project
            });
        });

    });

    app.get('/projects/', function(req, res) {
        db.findAll('projects', function(json) {
            res.render('projects.jade', {
                projects: json
            });
        });
    });

};
