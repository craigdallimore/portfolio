App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

    Collection.Network = Backbone.Collection.extend({
        model: App.Model.Network,
        url: function() {
            return '/api/networks';
        }
    });

});
