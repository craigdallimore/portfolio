var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: String,
    body: String
});

exports.Post = function(db) {
    return db.model('Post', postSchema);
};
