exports.init = function(App) {

    var Q = require('q');

    return function(modelName,  id, fields, body) {

        var deferred = Q.defer();

        App.Model[modelName].findById(id).exec().then(function(result) {

            fields.forEach(function(field, i) {
                result[field] = body[field];
            });

            result.save(function(err, updatedResult) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(updatedResult);
                }
            });
        }, function(err) {
            deferred.reject(err);
        });

        return deferred.promise;

    };

};
