App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Route = {
        index: function() {
            var index = new App.View.Index();
            var page = new App.Model.Page({ title: 'Portfolio' });
            var header = new App.View.Header({ model: page });
            var footer = new App.View.Footer();

            App.canvas.show(index);
            App.header.show(header);
            App.footer.show(footer);
        },

        about: function() {
            var about = new App.View.About();
            var page = new App.Model.Page({ title: 'About / Contact' });
            var header = new App.View.Header({ model: page });
            var footer = new App.View.Footer();

            App.canvas.show(about);
            App.header.show(header);
            App.footer.show(footer);

        },

        blog: function() {
            var blog = new App.View.Blog();
            var page = new App.Model.Page({ title: 'Blog' });
            var header = new App.View.Header({ model: page });
            var footer = new App.View.Footer();
            App.canvas.show(blog);
            App.header.show(header);
            App.footer.show(footer);
        },

        projects: function() {
            if(! App.ProjectCollection) {
                App.ProjectCollection = new App.Collection.Project();
            }
            var page = new App.Model.Page({ title: 'Projects' });
            var header = new App.View.Header({ model: page });
            var footer = new App.View.Footer();
            var projects = new App.View.Projects({
                collection: App.ProjectCollection,
                itemView: App.View.Tile,
                emptyView: App.View.TileEmpty
            });
            App.canvas.show(projects);
            App.header.show(header);
            App.footer.show(footer);
        },

        project: function(label) {

            var showProject = function() {

                var model = App.ProjectCollection.find( function(project) {
                    return project.get('label') == label;
                });

                var project = new App.View.Project({ model: model });
                var header = new App.View.Header({ model: model });
                var footer = new App.View.Footer();

                App.canvas.show(project);
                App.header.show(header);
                App.footer.show(footer);
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
