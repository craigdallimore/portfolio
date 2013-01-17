App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Project = Marionette.View.extend({
        tagName: 'section',
        className: 'projectDetails transformed',
        events: {
            'click .btn-back': 'navigate',
            'click .btn-next': 'navigateNext',
            'click .btn-prev': 'navigatePrev'
        },
        template: 'Project',

        initialize: function() {
        },

        navigate: function(e) {
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
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            var self = this;
            this.$el.html(html);
            _.defer(function() {
                self.$el.removeClass('transformed');
            });
        }
    });
});
