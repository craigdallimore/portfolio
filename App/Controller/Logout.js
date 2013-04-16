exports.Logout = function(req, res, next) {
    req.logout();
    req.flash('info', 'You have been logged out');
    res.redirect('/');
};
