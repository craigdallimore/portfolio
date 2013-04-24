App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Row = Marionette.ItemView.extend({

        tagName: 'tr',
        template: 'BookRow',

        events: {
            'click .remove': 'removeResource',
            'click .edit': 'editResource',
            'click .update': 'updateResource'
        },

        modelEvents: {
            'remove': 'remove'
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        },

        removeResource: function() {
            var collection = this.model.collection;
            this.model.destroy({
                error: _.bind(collection.add, collection)
            });
        },

        editResource: function() {
            this.template = 'BookEditRow';
            this.render();
        },

        updateResource: function() {
            var attributes = {
                author: this.$el.find('input[name="author"]').val(),
                title: this.$el.find('input[name="title"]').val(),
                link: this.$el.find('input[name="link"]').val(),
                label: this.$el.find('input[name="label"]').val()
            };

            this.model.save(attributes, {
                success: _.bind(this.onUpdate, this),
                error: _.bind(this.onUpdateErr, this)
            });

            this.template = 'BookRow';
            this.render();
        },

        onUpdate: function(model, response, options) {
        },

        onUpdateErr: function(model, xhr, options) {
        }


    });

});
