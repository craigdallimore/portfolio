App.module("Routing", function(Routing, App, Backbone, Marionette, $, _) {

    Routing.start = function() {

        var Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                '':                 'Index',
                'cms/':             'CMS',
                'about/':           'About',
                'projects/':        'Projects',
                'projects/:name':   'Project',
                'projects/:name/':  'Project'
            }
        });

        App.Router = new Router({ controller: App.Controller });

        App.vent.on('navigate', App.Router.navigate);

        if(Modernizr.history) {
            Backbone.history.start({ pushState: true });
        } else {
            // Support IE
            var match = Backbone.history.start({
                pushState: false,
                root: '/about'
            });
        }
    };

});
