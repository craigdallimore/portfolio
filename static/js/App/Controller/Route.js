App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Route = {
        index: function() {
            var index = new App.View.Index();
            var page = new App.Model.Page({ title: 'Portfolio' });
            var header = new App.View.Header({ model: page });
            App.canvas.show(index);
            App.header.show(header);
        },

        about: function() {
            var about = new App.View.About();
            var page = new App.Model.Page({ title: 'About / Contact' });
            var header = new App.View.Header({ model: page });

            App.canvas.show(about);
            App.header.show(header);

        },

        blog: function() {
            var blog = new App.View.Blog();
            var page = new App.Model.Page({ title: 'Blog' });
            var header = new App.View.Header({ model: page });
            App.canvas.show(blog);
            App.header.show(header);
        },

        projects: function() {

            if(! App.ProjectCollection) {
                App.ProjectCollection = new App.Collection.Project();
            }

            var page = new App.Model.Page({ title: 'Projects' });
            var header = new App.View.Header({ model: page });
            var projects = new App.View.TileList({
                collection: App.ProjectCollection,
                itemView: App.View.Tile
            });

            App.canvas.show(projects);
            App.modal.close();
            App.header.show(header);
        },

        project: function(label) {

            var showProject = function() {

                var model = App.ProjectCollection.find( function(project) {
                    return project.get('label') == label;
                });

                var project = new App.View.Project({ model: model });
                var projectControls = new App.View.PivotControls({ model: model });
                var header = new App.View.Header({ model: model });

                App.canvas.show(project);
                App.modal.show(projectControls);
                App.header.show(header);
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
