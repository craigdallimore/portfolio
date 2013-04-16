var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    slashes = require('connect-slashes'),
    Route = require('./App/Route'),
    API = Route.API,
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    errorHandler = require('./middleware/errorHandler'),
    notFoundHandler = require('./middleware/notFoundHandler'),
    App = express(),
    server = http.createServer(App);

// Open Database
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', console.error.bind(console, 'Connection Error:'));
mongoose.connection.once('open', function() {
    console.log('DB opened');
});

// Connect configuration
App.configure(function() {
    App.use(express.compress());
    App.set('views', __dirname + '/App/View');
    App.use('view engine', 'jade');
    App.use(express.bodyParser());
    App.use(express.cookieParser());
    App.use(express.session({ secret: 'ghost chips' }));
    App.use(passport.initialize());
    App.use(passport.session());
    App.use(flash());
    App.use(App.router);


    App.use('/static', express.static(__dirname + '/static'));
    App.use(express.static(__dirname));
    App.use(slashes());
    App.use(notFoundHandler);
    App.use(errorHandler);
});

App.configure('development', function() {
    App.use(express.logger('dev'));
    App.locals.pretty = true;
});

// Routes
App.get('/api/book',            API.Book.findAll);
App.get('/api/book/:id',        API.Book.findById);
App.post('/api/book',           API.Book.create);
App.put('/api/book/:id',        API.Book.update);
App.delete('/api/book/:id',     API.Book.removeById);
App.delete('/api/book',         API.Book.removeAll);

App.get('/api/network',         API.Network.findAll);
App.get('/api/network/:id',     API.Network.findById);
App.post('/api/network',        API.Network.create);
App.put('/api/network/:id',     API.Network.update);
App.delete('/api/network/:id',  API.Network.removeById);
App.delete('/api/network',      API.Network.removeAll);

App.get('/api/profile',                 API.Profile.findAll);
App.get('/api/profile/:id',             API.Profile.findById);
App.get('/api/profile/label/:label',    API.Profile.findByLabel);
App.post('/api/profile',                API.Profile.create);
App.put('/api/profile/:id',             API.Profile.update);
App.delete('/api/profile/:id',          API.Profile.removeById);
App.delete('/api/profile',              API.Profile.removeAll);

App.get('/api/project',                 API.Project.findAll);
App.get('/api/project/:id',             API.Project.findById);
App.get('/api/project/label/:label',    API.Project.findByLabel);
App.put('/api/project/:id',             API.Project.update);
App.post('/api/project/',               API.Project.create);
App.delete('/api/project/:id',          API.Project.removeById);
App.delete('/api/project',              API.Project.removeAll);

App.get('/api/tech',            API.Tech.findAll);
App.get('/api/tech/:id',        API.Tech.findById);
App.put('/api/tech/:id',        API.Tech.update);
App.post('/api/tech/',          API.Tech.create);
App.delete('/api/tech/:id',     API.Tech.removeById);
App.delete('/api/tech',         API.Tech.removeAll);

App.delete('/api/user',         API.User.removeAll);

App.get('/',                    Route.Index);
App.get('/about',               Route.About);
App.get('/projects',            Route.Projects);
App.get('/projects/:label',     Route.Project);
App.get('/cms',                 Route.CMS);
App.get('/login',               Route.Login.get);
App.post('/login',              Route.Login.post);
App.get('/logout',              Route.Logout);
App.get('/register',            Route.Register.get);
App.post('/register',           Route.Register.post);

// App is available for testing
module.exports = App;

// Start server
if (!module.parent) {
    server.listen(process.env.VCAP_APP_PORT || 3000);
    console.log("Listening on port %d", server.address().port);
}
