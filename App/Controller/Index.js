exports.Index = function(req, res, next) {

    res.render('Index.jade', {
        message: req.flash('info')
    });

};
