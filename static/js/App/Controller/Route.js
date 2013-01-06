App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Route = {
        index: function() {
            App.Page.set('pageTitle', 'Welcome page');
            var index = new App.View.Index();
            App.canvas.show(index);
        },

        projects: function() {
            App.Page.set('pageTitle', 'Projects');

            App.ProjectCollection = new App.Collection.Project();

            var projects = new App.View.TileList({
                collection: App.ProjectCollection,
                itemView: App.View.Tile
            });
            App.canvas.show(projects);
        },

        project: function(label) {

            if(! App.ProjectCollection) return;

            var model = App.ProjectCollection.find( function(project) {
                return project.get('label') == label;
            });
            App.Page.set('pageTitle', model.get('title'));

            var project = new App.View.Project({
                model: model
            });
            App.canvas.show(project);
        }
    };
});