App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Profile = App.View.AnimationView.extend({
        tagName: 'section',
        template: 'Profile',

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            var self = this;

            this.$el.html(html);

            _.defer(function() {
                self.animateList('a', 150);
            });
        }
    });

});
