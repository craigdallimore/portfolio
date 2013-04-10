exports.init = function(App) {

    var Q = require('q');

    return function(modelName, query) {

        var model = App.Model[modelName];

        if (query && query._id) {
            return model.findById(query._id).exec();
        }
        if (query && query.label) {
            return model.findOne(query).exec();
        }
        return model.find().exec();

    };

};

