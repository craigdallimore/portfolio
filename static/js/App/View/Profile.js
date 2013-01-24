App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Profile = Marionette.View.extend({
        tagName: 'section',
        template: 'Profile',
        initialize: function() {

        },

        animateAnchors: function() {
            var $anchors = this.$el.find('a');
            _.log($anchors);
            $anchors.each(function($anchor) {
                $anchor.removeClass('transformedAnchor');
            });
        },

        render: function() {
            var json = this.model.toJSON();
            var html = App.Tmpl[this.template](json);
            var self = this;

            this.$el.html(html);

            _.defer(function() {
                self.animateAnchors();
            });
        }
    });

});
