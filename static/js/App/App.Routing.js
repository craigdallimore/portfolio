App.module("Routing", function(Routing, App, Backbone, Marionette, $, _) {

    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            '':                 'index',
            'blog/':            'blog',
            'about/':           'about',
            'projects/':        'projects',
            'projects/:name':   'project'
        }
    });

    Routing.start = function() {

        App.Router = new Router({
            controller: App.Controller.Route
        });

        App.Page = new App.Model.Page({
            title: 'Portfolio',
            pageTitle: 'Portfolio'
        });

        App.PageInstance = new App.View.Page({
            model: App.Page,
            el: 'html'
        });

        App.vent.on('navigate', App.Router.navigate);

        if(Modernizr.history) {
            Backbone.history.start({ pushState: true });
        } else {
            // Support IE
            Backbone.history.start({ pushState: false, silent: true});
            Backbone.history.loadUrl(window.location.pathname);
        }
    };

    App.vent.on('start', Routing.start());

});