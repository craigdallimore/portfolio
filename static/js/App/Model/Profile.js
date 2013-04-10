App.module('Model', function(Model, App, Backbone, Marionette, $, _) {
    Model.Profile =  Backbone.Model.extend({
        url: function() {
            return '/api/profile/label/craigdallimore/';
        }
    });
});
