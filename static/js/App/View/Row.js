App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Row = Marionette.ItemView.extend({

        tagName: 'tr',
        template: 'BookRow',

        events: {
            'click .remove': 'onRemove'
        },

        modelEvents: {
            'remove': 'remove'
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        },

        onRemove: function() {
            var collection = this.model.collection;
            this.model.destroy({
                error: _.bind(collection.add, collection)
            });
        }

    });

});
