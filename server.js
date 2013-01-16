var express = require('express'),
    app = express(),
    projects = require('./routes/projects');
//    contacts = require('./routes/contacts');

app.set('views', __dirname + '/views');
app.use('view engine', 'jade');

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.locals.pretty = true;
});

app.use('/', express.static(__dirname + '/static'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/projects/static', express.static(__dirname + '/static'));
app.use('/about/static', express.static(__dirname + '/static'));
app.use('/blog/static', express.static(__dirname + '/static'));

// Individual project
app.get('/projects/:label', function(req, res) {
    projects.findOne('label', req.params.label, function(project) {

        if (project) {
            res.render('project.jade', {
                project: project
            });
        } else {
            res.render('404.jade');
        }
    });
});

// Project list
app.get('/projects/', function(req, res) {
    projects.findAll(function(json) {
        res.render('projects.jade', {
            projects: json
        });
    });
});

app.get('/about/', function(req, res) {
    res.render('about.jade');
});

app.get('/blog/', function(req, res) {
    res.render('blog.jade');
});

// Welcome page
app.get('/', function(req, res) {
    res.render('index.jade');
});

// API
app.get('/api/projects/:id', function(req, res) {
    projects.findOne('id', parseInt(req.params.id, 10), function(json) {
        if (json) {
            res.send(json);
        } else {
            res.send('');
        }
    });
});

app.get('/api/projects', function(req, res) {
    projects.findAll(function(json) {
        res.send(json);
    });
});

// app.get('/api/contact/social', function(req, res) {
//     contacts.findAll(function(json) {
//         res.send(json);
//     });
// });

//404
app.get('*', function(req, res) {
    res.render('404.jade');
});

app.listen(3000);
console.log("Listening on port 3000");
