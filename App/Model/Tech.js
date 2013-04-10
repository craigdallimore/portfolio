exports.Model = function(mongoose) {

    var schema = mongoose.Schema({
        label: { type: String, required: true },
        affinity: { type: Number, required: true },
        skill: { type: Number, required: true },
        name: { type: String, required: true },
    });

    return mongoose.model('Tech', schema);

};


