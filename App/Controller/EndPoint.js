exports.EndPoint = function(Model, fields) {

    var findAll = function(req, res, next) {
        Model.find().exec().then(function(items) {
            if (items.length) {
                res.send(200, items);
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    },

    findByLabel = function(req, res, next) {
        Model.findOne({ label: req.params.label }).exec().then(function(item) {
            if(item) {
                res.send(200, item);
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    },

    findById = function(req, res, next) {
        Model.findById(req.params.id).exec().then(function(item) {
            if(item) {
                res.send(200, item);
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    },

    create = function(req, res, next) {

        var postData = {};

        fields.forEach(function(field, i) {
            postData[field] = req.body[field];
        });

        var item = new Model(postData);

        item.save(function(err, newItem) {
            if (err) {
                next(err);
            } else {
                res.send(201, newItem);
            }
        });

    },

    update = function(req, res, next) {

        Model.findById(req.params.id).exec().then(function(item) {
            fields.forEach(function(field, i) {
                item[field] = req.body[field];
            });
            item.save(function(err, updatedItem) {
                if (err) {
                    next(err);
                } else {
                    res.send(201, updatedItem);
                }
            });
        }, next);
    },

    removeAll = function(req, res, next) {
        Model.find().remove(function(err) {
            if(err) { return next(err); }
            res.send(200, []);
        });
    },

    removeById = function(req, res, next) {
        Model.findByIdAndRemove(req.params.id).exec().then(function(item) {
            res.send(200, item);
        }, next);
    };

    return {
        findAll:        findAll,
        findById:       findById,
        findByLabel:    findByLabel,
        update:         update,
        create:         create,
        removeAll:      removeAll,
        removeById:     removeById
    };

};
