var express = require('express'),
    slashes = require('connect-slashes'),
    http = require('http'),

    db = require('./mongo.js'),
    fs = require('fs'),
    path = require('path'),
    RoutePath = 'routes',
    files = fs.readdirSync(RoutePath),
    q = require('q'),

    app = express(),
    server = http.createServer(app);

app.set('views', __dirname + '/views');
app.use('view engine', 'jade');
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname));
app.use(slashes());

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.locals.pretty = true;
});

files.forEach(function(file) {
    var filePath = path.resolve('./', RoutePath, file),
        route = require(filePath);
    route.init(app, db, q);
});

server.listen(process.env.VCAP_APP_PORT || 3000);
console.log("Listening on port %d", server.address().port);
