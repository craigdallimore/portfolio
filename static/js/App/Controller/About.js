App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.About = function() {

        var pageModel = new App.Model.Page({ title: 'About / Contact' });

        if (App.bootstrapped) {

            // SPA navigation
            App.canvas.show(new App.View.About());
            App.header.show(new App.View.Header({ model: pageModel }));

        } else {

            // Page Refresh navigation
            App.canvas.attachView(new App.View.About({
                 el: $('#canvas .about')
            }));
            App.header.attachView(new App.View.Header({
                model: pageModel,
                el: $('#header hgroup')
            }));

            App.bootstrapped = true;

        }

    };

});

