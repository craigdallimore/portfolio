exports.init = function(app, db, q) {

    app.get('/about/', function(req, res) {

        var dfdNetworks = q.defer();
        var dfdBooks = q.defer();

        db.findAll('networks', dfdNetworks.resolve);
        db.findAll('books', dfdBooks.resolve);

        q.all([ dfdNetworks.promise, dfdBooks.promise ])
            .spread( function(networks, books) {
                res.render('about.jade', { networks: networks, books: books });
            });

    });

};
