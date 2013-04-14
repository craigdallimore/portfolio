exports.CMS = function() {

    return function(req, res, next) {
        res.render('cms.jade');
    };

};
