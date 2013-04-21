App.module('Model', function(Model, App, Backbone, Marionette, $, _) {
    Model.Book = Backbone.Model.extend({
        url: '/api/book',
        idAttribute: '_id'
    });
});
