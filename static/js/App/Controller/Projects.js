App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Projects = function() {

        var pageModel = new App.Model.Page({ title: 'Projects' });

        if (App.bootstrapped) {

            // SPA navigation
            App.ProjectCollection = App.ProjectCollection || new App.Collection.Project();

            App.canvas.show(new App.View.Projects({
                collection: App.ProjectCollection,
                itemView: App.View.Tile,
                emptyView: App.View.TileEmpty
            }));
            App.header.show(new App.View.Header({ model: pageModel }));

        } else {

            // Page Refresh navigation
            App.ProjectCollection = new App.Collection.Project(App.Data.Projects());

            App.canvas.attachView(new App.View.Projects({
                el: $('#canvas .projects'),
                collection: App.ProjectCollection,
                itemView: App.View.Tile,
                emptyView: App.View.TileEmpty,
                DOMExists: true
            }));

            App.header.attachView(new App.View.Header({
                model: pageModel,
                el: $('#header hgroup')
            }));

            App.bootstrapped = true;

        }

    };
});

