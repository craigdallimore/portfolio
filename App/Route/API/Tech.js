exports.init = function(App) {

    var path = '/api/tech/',
        modelName = 'Tech',
        fields = [
            'affinity',
            'skill',
            'name',
            'label'
        ];

    App.post(path, function(req, res, next) {
        App.Controller.Post(modelName, fields, req.body).then(function(item) {
            res.send(201, item);
        }, next);
    });

    App.put(path + ':id', function(req, res, next) {
        App.Controller.Put(modelName, req.params.id, fields, req.body).then(function(item) {
            res.send(201, item);
        }, next);
    });

    App.get(path, function(req, res, next) {
        App.Controller.Get(modelName).then(function(items) {
            if (items.length) {
                res.send(200, items);
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    });

    App.get(path + ':id', function(req, res, next) {
        App.Controller.Get(modelName, { _id: req.params.id }).then(function(item) {
            if (item) {
                res.send(200, item);
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    });

    App.delete(path + ':id', function(req, res) {
        App.Model[modelName].findByIdAndRemove(req.params.id).exec().then(function(result) {
            if (result) {
                res.send(200, result);
            } else {
                res.send(404, 'Not found\n');
            }
        }, function(err) {
            res.send(404, err.name);
        });
    });

    App.delete(path, function(req, res) {
        App.Model[modelName].find().remove(function(err) {
            res.send(200, []);
        });
    });

};

