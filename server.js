var express = require('express'),
    slashes = require('connect-slashes'),
    http = require('http'),

    db = require('./mongo.js'),
    q = require('q'),

    app = express(),
    server = http.createServer(app);

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.use('view engine', 'jade');
    app.use('/static', express.static(__dirname + '/static'));
    app.use(express.static(__dirname));
    app.use(slashes());
});

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.locals.pretty = true;
});
require('./routes/projects.js').init(app, db, q);
require('./routes/about.js').init(app, db, q);
require('./routes/api.js').init(app, db, q);
require('./routes/downloads.js').init(app, db, q);
require('./routes/index.js').init(app, db, q);
require('./routes/404.js').init(app, db, q);



server.listen(process.env.VCAP_APP_PORT || 3000);
console.log("Listening on port %d", server.address().port);
