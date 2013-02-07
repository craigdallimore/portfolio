App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

    Collection.Book = Backbone.Collection.extend({
        model: App.Model.Book,
        url: function() {
            return '/api/books/';
        }
    });

});
