App.module('View', function(View, App, Backbone, Marionette, $, _) {

    View.About = Marionette.View.extend({
        tagName: 'section',
        className: 'about',
        template: 'About',

        events: {
            'click .btn-go': 'navigate'
        },

        navigate: function(e) {
            e.preventDefault();

            var path =  $(e.target).attr('href');
            App.vent.trigger('navigate', path, {trigger: true});
        },

        initialize: function() {

            var self = this;

            App.addRegions({
                profile: '#canvas .profile',
                networkList: '#canvas .networkList',
                bookList: '#canvas .bookList',
                techList: '#canvas .about .techList'
            });

            _.defer(self.renderProfile);
            _.defer(self.renderNetworks);
            _.defer(self.renderBooks);
            _.defer(self.renderTech);
        },

        close: function() {
            App.profile.close();
            App.networkList.close();
            App.bookList.close();
            App.techList.close();
        },

        renderProfile: function() {

            var profileModel = new App.Model.Profile();
            var profileView = new App.View.Profile({ model: profileModel });

            profileModel.fetch().success(function() {
                App.profile.show(profileView);
            });

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

        renderTech: function() {
            var techCollection = new App.Collection.Tech();
            var techList = new App.View.TechList({
                collection: techCollection,
                itemView: App.View.Tech
            });

            App.techList.show(techList);
        },


        render: function() {
            var self = this;
            var html = App.Tmpl[this.template]();
            this.$el.html(html);
        }
    });
});
