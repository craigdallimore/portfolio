var _ = require('underscore');

exports.Project = function(project) {

    return function(req, res, next) {
        project.find().exec().then(function(items) {
            var item = _.find(items, function(match) {
                return match.label === req.params.label;
            });
            if (items.length && item) {
                res.render('project.jade', { projects: items, project: item });
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    };

};
