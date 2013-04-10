var express = require('express'),
    slashes = require('connect-slashes'),
    http = require('http'),
    mongoose = require('mongoose'),
    errorHandler = require('./middleware/errorHandler'),
    App = express(),
    server = http.createServer(App);

App.Model = {
    Project: require('./App/Model/Project').Model(mongoose),
    Profile: require('./App/Model/Profile').Model(mongoose),
    Network: require('./App/Model/Network').Model(mongoose),
    Book: require('./App/Model/Book').Model(mongoose),
    Tech: require('./App/Model/Tech').Model(mongoose)
};

App.Controller = {
    Post: require('./App/Controller/Post').init(App),
    Put: require('./App/Controller/Put').init(App),
    Get: require('./App/Controller/Get').init(App),
    Delete: require('./App/Controller/Delete').init(App)
};

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', console.error.bind(console, 'Connection Error:'));
mongoose.connection.once('open', function() {

    console.log('DB opened');

});

App.configure(function() {
    App.use(express.compress());
    App.use(express.bodyParser());
    App.set('views', __dirname + '/App/View');
    App.use('view engine', 'jade'); App.use('/static', express.static(__dirname + '/static'));
    App.use(express.static(__dirname));

    require('./App/Route/API/Project').init(App);
    require('./App/Route/API/Profile').init(App);
    require('./App/Route/API/Network').init(App);
    require('./App/Route/API/Book').init(App);
    require('./App/Route/API/Tech').init(App);

    require('./App/Route/Index').init(App);
    require('./App/Route/About.js').init(App);
    require('./App/Route/Projects.js').init(App);
    //require('./routes/downloads.js').init(app, db, q);
    //require('./App/Route/CMS').init(App);
    require('./App/Route/404.js').init(App);

    App.use(slashes());
    App.use(errorHandler());
});

App.configure('development', function() {
    App.use(express.logger('dev'));
    App.locals.pretty = true;
});
module.exports = App;

if (!module.parent) {
    server.listen(process.env.VCAP_APP_PORT || 3000);
    console.log("Listening on port %d", server.address().port);
}
