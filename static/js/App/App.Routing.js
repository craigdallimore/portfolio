App.module("Routing", function(Routing, App, Backbone, Marionette, $, _) {

    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            '':                 'index',
            'blog/':            'blog',
            'about/':           'about',
            'projects/':        'projects',
            'projects/:name':   'project',
            'projects/:name/':  'project'
        }
    });

    Routing.start = function() {

        App.Router = new Router({
            controller: App.Controller.Route
        });

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

    App.vent.on('start', function(){
        Routing.start();
    });

});
