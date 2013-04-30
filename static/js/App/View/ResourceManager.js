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
                view = new App.View.BookRow({
                    el: el,
                    model: collection.get(id),
                });
            });
        },

        getAttributes: function(fields) {
            var attributes = {},
            $el = this.$el.find('form');

            fields.map(function(field) {
                attributes[field] = $el.find('input[name="' + field + '"]').val();
            });

            return attributes;
        },

        saveResource: function(e) {
            e.preventDefault();

            var model = new App.Model.Book(),
                attributes = this.getAttributes(model.fields);

            this.clearErrors();
            this.listenTo(model, 'invalid', this.onInvalidField);

            model.set(attributes, { validate: false });

            if (!model.isValid()) {
                this.stopListening(model);
                return;
            }

            model.save(attributes, {
                success: _.bind(this.onSave, this),
                error: _.bind(this.onSaveErr, this)
            });

            this.collection.add(model);
        },

        onInvalidField: function(model, errors, options) {
            _.map(errors, this.showError, this);
        },

        clearErrors: function() {
            this.$el.find('.errorMsg').remove();
            this.$el.find('.error').removeClass('error');
        },

        showError: function(error) {
            var $input = this.$el.find('form input[name="' + error.field  + '"]'),
                $label = $('<label>', {
                    for: error.field,
                    class: 'errorMsg'
                });

            $input.addClass('error');
            $label.text(error.message);
            $input.after($label);
        },

        onSave: function(model, response, options) {
            this.$el.find('form input[type="text"]').each(function(idx, input) {
                input.value = '';
            });
            this.stopListening(model);
        },

        onSaveErr: function(model, xhr, options) {
            this.collection.remove(model);
            this.stopListening(model);
        }

    });

});
