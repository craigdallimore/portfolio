App.module('View', function(View, App, Backbone, Marionette, $, _) {
    View.Header = Marionette.View.extend({
        tagName: 'hgroup',
        template: 'Header',

        initialize: function() {
            var title = this.model.get('title');
            App.vent.trigger('title:change', title);
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        }
    });
});
