var mongo = require('mongodb'),
    q = require('q'),
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
var dbname = 'dev_portfolio';
var collNames = ['projects', 'books', 'networks', 'profiles', 'technologies'];

db = new Db(dbname, server, { safe: true});

// Attempt to open connection to database
db.open(function(err, db) {
    console.log('Opening connection to db: ' + dbname );
    if (!err) {

        console.log("Connected to '" + dbname + "' database");

        db.collection('projects', function(err, collection) {
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
      console.log(collName + 'retreived');
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
    db.collection(collName, function(err, collection) {

        if(err) throw err;
        var target = q.defer();

        collection.findOne(query, function(err, match) {
            target.resolve(match);
        });

        target.promise.then(callback);

    });
};

exports.flush = function( callback ) {

    var flush = function(collName) {
        db.collection(collName, function(err, collection) {
            collection.drop();
            console.log('Dropped ' + collName);
        });

    };


    callback('Flushed\n');
    collNames.forEach(flush);
};

var populateDB = function() {

    var insert = function(collName) {

        var json = require('./data/' + collName  + '.json');

        db.collection(collName, function(err, collection) {
            collection.insert(json, function(err, result) {
                console.log('Created sample data for ' + collName);
            });
        });
    };

    collNames.forEach(insert);

};
