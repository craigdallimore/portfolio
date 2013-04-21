App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.ResourceManager = Marionette.CompositeView.extend({

        events: {
            'submit form': 'saveResource'
        },

        itemViewContainer: 'tbody',

        initialize: function() {
            var collection = this.collection;

            this.$el.find('tbody').children().map(function(idx, el) {
                var id = $(el).attr('data-id'),
                view = new App.View.Row({
                    el: el,
                    model: collection.get(id),
                });
            });
        },

        saveResource: function(e) {
            e.preventDefault();
            var attributes = {
                author: this.$el.find('input[name="author"]').val(),
                title: this.$el.find('input[name="title"]').val(),
                link: this.$el.find('input[name="link"]').val(),
                label: this.$el.find('input[name="label"]').val()
            },
            model = new App.Model.Book();
            model.save(attributes, {
                success: _.bind(this.onSuccess, this),
                error: _.bind(this.onError, this)
            });
            this.collection.add(model);
        },

        onSuccess: function(model, response, options) {
        },

        onError: function(model, xhr, options) {
            this.collection.remove(model);
        }

    });


});
