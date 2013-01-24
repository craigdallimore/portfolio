exports.init = function(app, db, q) {

    app.get('/about/', function(req, res) {

        var dfdTech = q.defer();
        var dfdNetworks = q.defer();
        var dfdBooks = q.defer();
        var dfdProfile = q.defer();

        var render = function(tech, networks, books, profile) {
            res.render('about.jade', {
                technologies: tech,
                networks: networks,
                books: books,
                profile: profile
            });
        };

        db.findAll('technologies', dfdTech.resolve);
        db.findAll('networks', dfdNetworks.resolve);
        db.findAll('books', dfdBooks.resolve);
        db.findOne('profiles', 'id', 1, dfdProfile.resolve);

        q.all([
            dfdTech.promise,
            dfdNetworks.promise,
            dfdBooks.promise,
            dfdProfile.promise
        ]).spread(render);

    });

};
