App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Footer = Marionette.View.extend({
        tagName: 'ul',
        template: 'Footer',

        events: {
            'click a': 'navigate'
        },

        navigate: function(e) {
            e.preventDefault();
            var path = $(e.target).attr('href');
            App.vent.trigger('navigate', path, { trigger: true });
        },

        render: function() {
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        }

    });

});
