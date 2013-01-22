exports.init = function(app, db) {

    app.get('/projects/:label', function(req, res) {
        db.findOne('projects', 'label', req.params.label, function(project) {

            if (project) {
                res.render('project.jade', {
                    project: project
                });
            } else {
                res.render('404.jade');
            }
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
