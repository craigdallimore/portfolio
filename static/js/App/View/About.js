App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.About = Marionette.View.extend({
        tagName: 'section',
        className: 'about',
        template: 'About',
        initialize: function() {

            var self = this;

            App.addRegions({
                networkList: '#canvas .networkList',
                bookList: '#canvas .bookList'
            });

            _.defer(self.renderNetworks);
            _.defer(self.renderBooks);
        },

        renderNetworks: function() {

            var networkCollection = new App.Collection.Network();
            var networkList = new App.View.NetworkList({
                collection: networkCollection,
                itemView: App.View.Network
            });

            App.networkList.show(networkList);

        },

        renderBooks: function() {
            var bookCollection = new App.Collection.Book();
            var bookList = new App.View.BookList({
                collection: bookCollection,
                itemView: App.View.Book
            });

            App.bookList.show(bookList);

        },

        render: function() {
            var self = this;
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        }
    });
});
