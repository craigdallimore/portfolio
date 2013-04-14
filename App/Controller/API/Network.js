exports.Network = function(Model) {

    var fields = [
        'id',
        'url',
        'label',
        'platform'
    ],

    EndPoint = require('../EndPoint').EndPoint,
    ep = new EndPoint(Model, fields);

    return {
        findAll:        ep.findAll,
        findById:       ep.findById,
        findByLabel:    ep.findByLabel,
        update:         ep.update,
        create:         ep.create,
        removeAll:      ep.removeAll,
        removeById:     ep.removeById
    };

};

