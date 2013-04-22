App.module('Controller', function(Controller, App, Backbone, Marionette, $, _) {

    Controller.CMS = function() {

        App.BookCollection = App.BookCollection || new App.Collection.Book(App.Data.Books());

        var pageModel = new App.Model.Page({ title: 'CMS' }),
            CMSView, bookManagerView;

        if (App.bootstrapped) {

            // SPA navigation
            CMSView = new App.view.CMS();
            bookManagerView = new App.View.ResourceManager({
                itemView: App.View.Row,
                collection: App.BookCollection
            });

            App.header.show(new App.View.Header({ model: pageModel }));
            App.canvas.show(CMSView);
            CMSView.bookManager.show(bookManagerView);

        } else {

            // Page Refresh navigation
            CMSView = new App.View.CMS({
                el: $('#canvas .cms')
            });

            bookManagerView = new App.View.ResourceManager({
                el: $('#bookTable'),
                itemView: App.View.Row,
                collection: App.BookCollection
            });

            App.header.attachView(new App.View.Header({
                model: pageModel,
                el: $('#header hgroup')
            }));

            App.canvas.attachView(CMSView);
            CMSView.bookManager.attachView(bookManagerView);

            App.bootstrapped = true;
        }
    };

});
