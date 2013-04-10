exports.init = function(App) {

    var Q = require('q');

    return function(modelName, fields, body) {

        var postData = {},
            deferred = Q.defer();

        fields.forEach(function(field, i) {
            postData[field] = body[field];
        });

        var model = new App.Model[modelName](postData);
        model.save(function(err, newModel) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newModel);
            }

        });

        return deferred.promise;

    };

};
