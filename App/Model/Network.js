exports.Model = function(mongoose) {

    var schema = mongoose.Schema({
        platform: { type: String, required: true },
        label: { type: String, required: true },
        url: { type: String, required: true },
        id: { type: Number, required: true },
    });

    return mongoose.model('Network', schema);

};

