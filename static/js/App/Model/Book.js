App.module('Model', function(Model, App, Backbone, Marionette, $, _) {

    Model.Book = Backbone.Model.extend({

        idAttribute: '_id',
        url: '/api/book',

        fields: ['title', 'author', 'link', 'label'],

        getUrl: function(method) {
            switch(method) {
                case 'delete':
                    return this.url + '/' + this.id;
                case 'update':
                    return this.url + '/' + this.id;
                default:
                    return this.url;
            }
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.getUrl(method.toLowerCase());
            Backbone.sync(method, model, options);
        },

        validate: function(attrs, options) {
            var errors = [];

            this.fields.map(function(field) {
                if(!attrs[field] || attrs[field] === undefined) {
                    errors.push({ field: field, message: 'This field is required' });
                }
            });

            if (errors.length) { return errors; }
        }

    });

});
