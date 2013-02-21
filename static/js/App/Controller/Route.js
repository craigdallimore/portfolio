App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    var DOMExists = true,
        headerEl = $('#header hgroup'),
        footerEl = $('#footer ul');

    function renderPage(title, contentView) {

            var page = new App.Model.Page({ title: title }),
                content,
                header,
                footer;

            if (DOMExists) {
                header = new App.View.Header({ model: page, el: headerEl });
                footer = new App.View.Footer({ el: footerEl });

                App.canvas.attachView(contentView);
                App.header.attachView(header);
                App.footer.attachView(footer);
                DOMExists = false;
                return;
            }

            header = new App.View.Header({ model: page });

            App.canvas.show(contentView);
            App.header.show(header);

    }

    Controller.Route = {

        index: function() {
            var options = DOMExists ? { el: $('#canvas .welcome') } : {},
                view = new App.View.Index(options);
            renderPage('Index', view);
        },

        about: function() {
            var options = DOMExists ? { el: $('#canvas .about'), DOMExists: true } : {},
                view = new App.View.About(options);
            renderPage('About / Contact', view);
        },

        projects: function() {

            App.ProjectCollection = App.ProjectCollection || new App.Collection.Project();

            var options = {
                collection: App.ProjectCollection,
                itemView: App.View.Tile,
                emptyView: App.View.TileEmpty
            };

            if (DOMExists) _.extend(options, {
                el: $('#canvas .projects'),
                DOMExists: true
            });

            var view = new App.View.Projects(options);
            renderPage('Projects', view);

        },

        project: function(label) {


            function renderProject() {

                var model = App.ProjectCollection.find(function(project) {
                    return project.get('label') == label;
                });
                var options = {
                    model: model
                };
                if (DOMExists) _.extend(options, {
                    el: $('#canvas .project'),
                    DOMExists: true
                });

                var view = new App.View.Project(options);
                renderPage(model.get('title'), view);
            }


            // Project Collection is empty
            if (DOMExists) {
                var projectJSON = App.Data.Projects();
                App.ProjectCollection = new App.Collection.Project(projectJSON);
                renderProject();
                return;
            }

            // Project Collection is full
            renderProject();
        }
    };
});
