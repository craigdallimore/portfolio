var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
var dbname = 'contacts';


db = new Db(dbname, server, { safe: true});

db.open(function(err, db) {
    console.log('Opening connection to database...');
    if (!err) {

        console.log("Connected to '" + dbname + "' database");

        db.collection(dbname, function(err, collection) {
            //collection.drop(); // todo - delete this
            collection.findOne(function(err, item) {
                if (!item){
                   console.log("The 'contacts' collection doesn't exist. Creating it with sample data");
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
    console.log('Find all contact points.');
    db.collection(dbname, function(err, collection) {
        collection.find().toArray(function(err, items) {
            callback(items);
        });
    });
};

var populateDB = function () {

    var contacts = require('../data/contacts.json');

    db.collection(dbname, function(err, collection) {
        collection.insert(contacts, function(err, result) {
            console.log('Created sample data.');
        });
    });

};
