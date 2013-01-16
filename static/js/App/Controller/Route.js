App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Route = {
        index: function() {
            App.Page.set('pageTitle', 'Welcome page');
            var index = new App.View.Index();
            App.canvas.show(index);
        },

        about: function() {
            App.Page.set('pageTitle', 'About / Contact');
            var about = new App.View.About();
            App.canvas.show(about);
        },

        blog: function() {
            App.Page.set('pageTitle', 'blog');
            var blog = new App.View.Blog();
            App.canvas.show(blog);
        },

        projects: function() {
            App.Page.set('pageTitle', 'Projects');
            if(! App.ProjectCollection) {
                App.ProjectCollection = new App.Collection.Project();
            }

            var projects = new App.View.TileList({
                collection: App.ProjectCollection,
                itemView: App.View.Tile
            });
            App.canvas.show(projects);
        },

        project: function(label) {

            var showProject = function() {
                var model = App.ProjectCollection.find( function(project) {
                    return project.get('label') == label;
                });
                var project = new App.View.Project({
                    model: model
                });
                App.Page.set('pageTitle', model.get('title'));
                App.canvas.show(project);
            };

            if(! App.ProjectCollection) {
                App.ProjectCollection = new App.Collection.Project();
                App.ProjectCollection.fetch({ success: showProject });
            } else {
                showProject();
            }

        }
    };
});
