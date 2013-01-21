App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.PivotControls = Marionette.View.extend({
        tagName: 'nav',
        className: 'pivotControls',
        template: 'PivotControls',

        events: {
            'click .btn-back': 'navigateBack',
            'click .btn-prev': 'navigatePrev',
            'click .btn-next': 'navigateNext'
        },

        initialize: function() {
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        },

        navigateBack: function(e) {
            e.preventDefault();
            var href = $(e.target).attr('href');
            App.vent.trigger('navigate', href, {trigger: true});
        },

        navigateNext: function(e) {
            e.preventDefault();
            var model = this.model;
            var label = this.model.collection.next(model).get('label');
            App.vent.trigger('navigate', '/projects/' + label, {trigger: true});
        },

        navigatePrev: function(e) {
            e.preventDefault();
            var model = this.model;
            var label = this.model.collection.prev(model).get('label');
            App.vent.trigger('navigate', '/projects/' + label, {trigger: true});
        }


    });

});
