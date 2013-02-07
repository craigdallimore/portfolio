App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

    Collection.Tech = Backbone.Collection.extend({
        model: App.Model.Tech,
        url: function() {
            return '/api/tech/';
        },
        comparator: function(tech) {
          var affinity = tech.get('affinity');
          return -affinity;
        }
    });

});
