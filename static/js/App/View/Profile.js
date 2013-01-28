App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Profile = App.View.AnimationView.extend({
        tagName: 'section',
        template: 'Profile',
        initialize: function() {
            if(!this.model.has('label')) {
                this.model.fetch().done(function() {
                    App.vent.trigger('profile:ready');
                });
                return;
            }
            this.render();
            _.defer(function() {
                App.vent.trigger('profile:ready');
            });
        },
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
