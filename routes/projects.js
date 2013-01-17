var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
var dbname = 'portfolio';


db = new Db(dbname, server, { safe: true});

db.open(function(err, db) {
    console.log('Opening connection to database...');
    if (!err) {

        console.log("Connected to '" + dbname + "' database");

        db.collection(dbname, function(err, collection) {
          //  collection.drop(); // todo - delete this
            collection.findOne(function(err, item) {
                if (!item){
                   console.log("The 'portfolio' collection doesn't exist. Creating it with sample data");
                   populateDB();
                }
            });
        });

    } else {
        console.log('Error connecting.');
        console.log(err);
    }
});


exports.findAll = function(callback) {
    console.log('Find all projects.');
    db.collection(dbname, function(err, collection) {
        collection.find().toArray(function(err, items) {
            callback(items);
        });
    });
};

exports.findOne = function(key, val, callback) {
    query = {};
    query[key] = val;
    console.log(query);
    db.collection(dbname, function(err, collection) {


        var target = q.defer();

        collection.findOne(query, function(err, match) {
            target.resolve(match);
        });

        target.promise.then(callback);

    });
};

var populateDB = function () {

    var projects = require('../data/projects.json');

    db.collection(dbname, function(err, collection) {
        collection.insert(projects, function(err, result) {
            console.log('Created sample data.');
        });
    });

};
