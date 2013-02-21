App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Index = Marionette.View.extend({
        events: {
            'click a': 'navigate'
        },
        tagName: 'section',
        className: 'welcome',

        navigate: function(e) {
            e.preventDefault();
            var path = $(e.target).attr('href');
            App.vent.trigger('navigate', path, {trigger: true});
        },
        render: function() {
            this.$el.html(App.Tmpl.Welcome());
        }
    });

});
