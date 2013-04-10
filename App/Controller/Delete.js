exports.init = function(App) {

    var Q = require('q');

    return function(modelName, id) {

        var deferred = Q.defer();

        if (id) {
            return App.Model[modelName].findByIdAndRemove(id).exec();
        }

        App.Model[modelName].find().remove(function(err) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve([]);
            }
        });

        return deferred.promise;

    };
};

