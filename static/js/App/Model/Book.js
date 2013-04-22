App.module('Model', function(Model, App, Backbone, Marionette, $, _) {

    Model.Book = Backbone.Model.extend({

        idAttribute: '_id',
        url: '/api/book',

        getUrl: function(method) {
            switch(method) {
                case 'delete':
                    return this.url + '/' + this.id;
                default:
                    return this.url;
            }
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.getUrl(method.toLowerCase());
            Backbone.sync(method, model, options);
        }

    });

});
