exports.Profile = function(Model) {

    var fields = [
        'firstname',
        'lastname',
        'title',
        'label',
        'email',
        'url'
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
