exports.Project = function(Model) {

    var fields = [
        'title',
        'subtitle',
        'label',
        'href_available',
        'href',
        'short_description',
        'long_description',
        'technology',
        'client',
        'startDate',
        'endDate'
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
