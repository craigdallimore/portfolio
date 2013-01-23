exports.init = function(app, db, q) {

    app.get('/about/', function(req, res) {

        var dfdNetworks = q.defer();
        var dfdBooks = q.defer();
        var dfdProfile = q.defer();

        var render = function(networks, books, profile) {
            res.render('about.jade', {
                networks: networks,
                books: books,
                profile: profile
            });
        };

        db.findAll('networks', dfdNetworks.resolve);
        db.findAll('books', dfdBooks.resolve);
        db.findOne('profiles', 'id', 1, dfdProfile.resolve);

        q.all([
            dfdNetworks.promise,
            dfdBooks.promise,
            dfdProfile.promise
        ]).spread(render);

    });

};
