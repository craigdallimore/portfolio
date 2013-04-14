App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

    Collection.Project = Backbone.Collection.extend({
        model: App.Model.Project,
        url: function() {
            return '/api/project';
        },
        comparator: function(project) {
            var date = project.get('startDate').replace(/-/g, '');
            return -date;
        }
    });

});
