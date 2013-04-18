App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Register = Marionette.View.extend({
        initialize: function() {
            this.$el.find('form').attr('novalidate', true);
        }

    });
});
