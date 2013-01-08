App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.About = Marionette.View.extend({
        tagName: 'section',
        className: 'about',
        template: 'About',
        initialize: function() {
            _.log('Init about view');
        },

        render: function() {
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        }
    });
});