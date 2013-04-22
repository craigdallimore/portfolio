App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Project = function(label) {

        var pageModel, projectModel;

        if (App.bootstrapped) {

            // SPA navigation
            projectModel = App.ProjectCollection.find(function(project) {
                return project.get('label') === label;
            });

            pageModel = new App.Model.Project({
                title: projectModel.get('title')
            }),

            App.canvas.show(new App.View.Project({ model: projectModel }));
            App.header.show(new App.View.Header({ model: pageModel }));

        } else {

            App.ProjectCollection = new App.Collection.Project(App.Data.Projects());

            // Page Refresh navigation
            projectModel = App.ProjectCollection.find(function(project) {
                return project.get('label') === label;
            });

            pageModel = new App.Model.Project({
                title: projectModel.get('title')
            }),

            App.canvas.attachView(new App.View.Project({
                el: $('#canvas .project'),
                model: projectModel,
                DOMExist: true
            }));

            App.header.attachView(new App.View.Header({
                model: pageModel,
                el: $('#header hgroup')
            }));

            App.bootstrapped = true;

        }

    };

});

