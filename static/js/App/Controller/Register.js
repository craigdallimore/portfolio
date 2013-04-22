App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Register = function() {

        var pageModel = new App.Model.Page({ title: 'Register' });

        if (App.bootstrapped) {

            // SPA navigation
            App.canvas.show(new App.View.Register());
            App.header.show(new App.View.Header({ model: pageModel }));

        } else {

            // Page Refresh navigation
            App.canvas.attachView(new App.View.Register({
                 el: $('#canvas .register')
            }));
            App.header.attachView(new App.View.Header({
                model: pageModel,
                el: $('#header hgroup')
            }));

            App.bootstrapped = true;

        }

    };

});

