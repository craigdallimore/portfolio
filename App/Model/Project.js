exports.Model = function(mongoose) {

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


