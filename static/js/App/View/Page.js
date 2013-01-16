App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.Page = Marionette.View.extend({
        initialize: function() {
            this.model.on('change:title', _.bind(this.updatePageTitles, this));
            this.model.on('change:pageTitle', _.bind(this.updatePageTitles, this));
        },
        updatePageTitles: function() {
            this.$el.find('h1').text(this.model.get('pageTitle'));
            this.$el.find('title').text(this.model.get('title'));
        }

    });

});