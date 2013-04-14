exports.Projects = function(project) {

    return function(req, res, next) {
        project.find().exec().then(function(items) {
            if (items.length) {
                res.render('projects.jade', { projects: items });
            } else {
                next({ name: 'NotFoundError' });
            }
        }, next);
    };

};
