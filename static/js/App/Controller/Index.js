App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.Index = function() {

        var pageModel = new App.Model.Page({ title: 'Index' });

        if (App.bootstrapped) {

            // SPA navigation
            App.canvas.show(new App.View.Index());
            App.header.show(new App.View.Header({ model: pageModel }));

        } else {

            // Page Refresh navigation
            App.canvas.attachView(new App.View.Index({
                 el: $('#canvas .welcome')
            }));
            App.header.attachView(new App.View.Header({
                model: pageModel,
                el: $('#header hgroup')
            }));

            App.bootstrapped = true;

        }

    };

});

