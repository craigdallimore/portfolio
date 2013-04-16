exports.User = function(Model) {

    var fields = [
    ],

    EndPoint = require('../EndPoint').EndPoint,
    ep = new EndPoint(Model, fields);

    return {
        removeAll:      ep.removeAll
    };

};

