var express = require('express'),
    app = express(),
    db = require('./mongo.js'),
    slashes = require('connect-slashes'),

    fs = require('fs'),
    path = require('path'),
    RoutePath = 'routes',
    files = fs.readdirSync(RoutePath),
    q = require('q');

app.set('views', __dirname + '/views');
app.use('view engine', 'jade');

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.locals.pretty = true;
    app.use('/static', express.static(__dirname + '/static'));
    app.use(express.static(__dirname));
    app.use(slashes());
});

files.forEach(function(file) {
    var filePath = path.resolve('./', RoutePath, file),
        route = require(filePath);
    route.init(app, db);
});

app.listen(3000);
console.log("Listening on port 3000");
