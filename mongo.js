var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
var dbname = 'dev_portfolio';


db = new Db(dbname, server, { safe: true});

// Attempt to open connection to database
db.open(function(err, db) {
    console.log('Opening connection to db: ' + dbname );
    if (!err) {

        console.log("Connected to '" + dbname + "' database");

        db.collection('projects', function(err, collection) {
         //   collection.drop(); // todo - delete this
            collection.findOne(function(err, item) {
                if (!item) {
                   console.log("The 'projects' collection doesn't exist. Creating it with sample data");
                   populateDB();
                }
            });
        });

    } else {
        console.log('Error connecting.');
        console.log(err);
    }
});

// Find all items in a collection
exports.findAll = function(collName, callback) {
    db.collection(collName, function(err, collection) {
        if (err) throw err;
        collection.find().toArray(function(err, items) {
            callback(items);
        });
    });
};

// Find a single item in a collection
exports.findOne = function(collName, key, val, callback) {
    query = {};
    query[key] = val;
    console.log(query);
    db.collection(collName, function(err, collection) {


        var target = q.defer();

        collection.findOne(query, function(err, match) {
            target.resolve(match);
        });

        target.promise.then(callback);

    });
};

var populateDB = function () {
    var projects = require('./data/projects.json');
    var technologies = require('./data/technologies.json');


    db.collection('projects', function(err, collection) {
        collection.insert(projects, function(err, result) {
            console.log('Created sample project data');
        });
    });

    db.collection('technologies', function(err, collection) {
      collection.insert(technologies, function(err, result) {
        console.log('Created sample technology data');
      });
    });

};
