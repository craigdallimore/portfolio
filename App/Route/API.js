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

    app.get('/api/books', function(req, res) {
        db.findAll('books', function(json) {
            res.send(json);
        });
    });

    app.get('/api/networks', function(req, res) {
        db.findAll('networks', function(json) {
            res.send(json);
        });
    });

    app.get('/api/tech', function(req, res) {
        db.findAll('technologies', function(json) {
            res.send(json);
        });
    });

    app.get('/api/flush', function(req, res) {
        db.flush( function(result) {
            res.send(result);
        });
    });

};
