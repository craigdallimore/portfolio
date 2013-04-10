exports.Model = function(mongoose) {

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

