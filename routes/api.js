exports.init = function(app, db) {

    app.get('/api/projects/:id', function(req, res) {
        db.findOne('projects', 'id', parseInt(req.params.id, 10), function(json) {
            if (json) {
                res.send(json);
            } else {
                res.send('');
            }
        });
    });

    app.get('/api/projects', function(req, res) {
        db.findAll('projects', function(json) {
            res.send(json);
        });
    });

};
