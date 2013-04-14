var mongoose = require('mongoose');

exports.book = function() {

    var schema = mongoose.Schema({
        title: { type: String, required: true },
        author: { type: String, required: true },
        link: { type: String, required: true },
        label: { type: String, required: true }
    });

    return mongoose.model('Book', schema);

};

exports.network = function() {

    var schema = mongoose.Schema({
        platform: { type: String, required: true },
        label: { type: String, required: true },
        url: { type: String, required: true },
        id: { type: Number, required: true },
    });

    return mongoose.model('Network', schema);

};

exports.profile = function() {

    var schema = mongoose.Schema({
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        title: { type: String, required: true },
        label: { type: String, required: true },
        email: { type: String, required: true },
        url: { type: String, required: true }
    });

    return mongoose.model('Profile', schema);

};

exports.project = function() {

    var schema = mongoose.Schema({
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        label: { type: String, required: true },
        href_available: { type: Boolean, required: true },
        href: { type: String, required: false },
        short_description: { type: String, required: true },
        long_description: { type: String, required: true },
        technology: { type: [String], required: false },
        client: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true }
    });

    return mongoose.model('Project', schema);

};

exports.tech = function() {

    var schema = mongoose.Schema({
        label: { type: String, required: true },
        affinity: { type: Number, required: true },
        skill: { type: Number, required: true },
        name: { type: String, required: true },
    });

    return mongoose.model('Tech', schema);

};

exports.user = function() {

    var schema = mongoose.Schema({
        email: { type: String, required: true },
        password: { type: String, required: true }
    });

    return mongoose.model('User', schema);

};
