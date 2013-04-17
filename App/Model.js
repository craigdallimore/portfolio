var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

exports.user = function() {

    var schema = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });

    schema.pre('save', function(next) {

        var user = this;

        if (!user.isModified('password')) { return next(); }

        bcrypt.genSalt(11, function(err, salt) {
            if (err) { return next(err); }

            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) { return next(err); }
                user.password = hash;
                next();
            });
        });

    });

    schema.methods.comparePassword = function(candidatePassword, callback) {
        var user = this;
        bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
            if (err) { return callback(err); }
            callback(null, isMatch);
        });

    };

    return mongoose.model('User', schema);

};

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

