exports.Model = function(mongoose) {

    var schema = mongoose.Schema({
        title: { type: String, required: true },
        author: { type: String, required: true },
        link: { type: String, required: true },
        label: { type: String, required: true }
    });

    return mongoose.model('Book', schema);

};

