App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Project = Marionette.View.extend({
        tagName: 'section',
        className: 'projectDetails',
        events: {
            'click .btn-back': 'navigate'
        },
        template: 'Project',
        initialize: function() {
        },

        navigate: function(e) {
            e.preventDefault();
            var href = $(e.target).attr('href');
            App.vent.trigger('navigate', href, {trigger: true});
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        }
    });
});