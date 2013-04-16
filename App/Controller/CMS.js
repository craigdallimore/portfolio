exports.CMS = function(User) {
    return function(req, res, next) {
        res.render('cms.jade');
    };
};
