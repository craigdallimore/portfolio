App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    var bootstrapped = false,
        headerEl = $('#header hgroup'),
        footerEl = $('#footer ul'),

    renderPage = function(options) {

        var pageModel = new App.Model.Page({ title: options.title }),
            config = options.config || {},
            view, header, footer;

        if (bootstrapped) {

            // SPA navigation
            view =   new App.View[options.viewName](config);
            header = new App.View.Header({ model: pageModel });
            App.canvas.show(view);
            App.header.show(header);

        } else {

            // Fresh page
            config = _.extend(config, options.bootstrapConfig);

            view =   new App.View[options.viewName](config),
            header = new App.View.Header({ model: pageModel, el: headerEl });
            footer = new App.View.Footer({ el: footerEl });
            App.canvas.attachView(view);
            App.header.attachView(header);
            App.footer.attachView(footer);
            bootstrapped = true;
        }

    };

    Controller.Index = function() {
        renderPage({
            viewName: 'Index',
            bootstrapConfig: { el: $('#canvas .welcome') },
            title: 'Index'
        });
    };

    Controller.About = function() {
        renderPage({
            viewName: 'About',
            bootstrapConfig: { el: $('#canvas .about') },
            title: 'About / Contact'
        });
    };

    Controller.CMS = function() {
        renderPage({
            viewName: 'CMS',
            bootstrapConfig: { el: $('#canvas .cms') },
            title: 'CMS'
        });
    };

    Controller.Projects = function() {
        App.ProjectCollection = App.ProjectCollection || new App.Collection.Project();
        renderPage({
            viewName: 'Projects',
            config: {
                collection: App.ProjectCollection,
                itemView: App.View.Tile,
                emptyView: App.View.TileEmpty
            },
            bootstrapConfig: {
                el: $('#canvas .projects'),
                DOMExists: true
            },
            title :'Projects'
        });
    };

    Controller.Project = function(label) {

        if (!bootstrapped) {
            var projectJSON = App.Data.Projects();
            App.ProjectCollection = new App.Collection.Project(projectJSON);
        }

        var model = App.ProjectCollection.find(function(project) {
            return project.get('label') === label;
        });

        renderPage({
            viewName: 'Project',
            config: {
                model: model
            },
            bootstrapConfig: {
                el: $('#canvas .project'),
                DOMExists: true
            },
            title: model.get('title')
        });

    };

});
