App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Blog = Marionette.View.extend({
        tagName: 'section',
        className: 'blog',
        template: 'Blog',
        initialize: function() {
            _.log('Init blog view');
        },

        render: function() {
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        }
    });
});