App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Profile = App.View.AnimationView.extend({
        tagName: 'section',
        template: 'Profile',
        initialize: function() {
            _.log(this.model);
            if(!this.model.has('label')) {
                _.log('does not have label');
                this.model.fetch({ silent: true }).done(function() {
                    App.vent.trigger('profile:ready');
                });
                return;
            }
            _.log('does have label');
            App.vent.trigger('profile:ready');
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
