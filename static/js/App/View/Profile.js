App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Profile = Marionette.View.extend({
        tagName: 'section',
        template: 'Profile',
        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            this.$el.html(html);
        }
    });

});
