App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Row = Marionette.ItemView.extend({

        tagName: 'tr',

        initialize: function() {
            this.template = this.readTemplate;
            this.listenTo(this.model, 'invalid', this.onInvalidField);
        },

        events: {
            'click .remove': 'removeResource',
            'click .edit': 'editResource',
            'click .update': 'updateResource',
            'click .undo': 'undo'
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
            this.template = this.editTemplate;
            this.render();
        },

        getAttributes: function() {
            var attributes = {},
            $el = this.$el;

            this.model.fields.map(function(field) {
                attributes[field] = $el.find('input[name="' + field + '"]').val();
            });

            return attributes;
        },

        updateResource: function() {

            var model = this.model,
                attributes = this.getAttributes();

            this.clearErrors();

            model.set(attributes, { validate: false });

            if (!this.model.isValid()) { return; }

            this.model.save(attributes, {
                success: _.bind(this.onUpdate, this),
                error: _.bind(this.onUpdateErr, this)
            });

            this.template = this.readTemplate;
            this.render();
        },

        onInvalidField: function(model, errors, options) {
            _.map(errors, this.showError, this);
        },

        clearErrors: function() {
            this.$el.find('.errorMsg').remove();
            this.$el.find('.error').removeClass('error');
        },

        showError: function(error) {
            var $input = this.$el.find('input[name="' + error.field  + '"]'),
                $label = $('<label>', {
                    for: error.field,
                    class: 'errorMsg'
                });

            $input.addClass('error');
            $label.text(error.message);
            $input.after($label);
        },

        onUpdate: function(model, response, options) {
        },

        onUpdateErr: function(model, xhr, options) {
            _.log('onupdateError', xhr.responseText);
        },

        undo: function() {
            var model = this.model;
            model.set(model.previousAttributes());
            this.template = this.readTemplate;
            this.render();
        }


    });

    View.BookRow = View.Row.extend({
        readTemplate: 'BookRow',
        editTemplate: 'BookEditRow'
    });

});
